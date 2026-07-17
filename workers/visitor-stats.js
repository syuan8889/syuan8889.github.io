const DEFAULT_SITE_KEY = 'syuan8889-homepage';

const CHINA_PROVINCE_NAME_MAP = {
    Anhui: '安徽',
    Beijing: '北京',
    Chongqing: '重庆',
    Fujian: '福建',
    Gansu: '甘肃',
    Guangdong: '广东',
    Guangxi: '广西',
    Guizhou: '贵州',
    Hainan: '海南',
    Hebei: '河北',
    Heilongjiang: '黑龙江',
    Henan: '河南',
    Hubei: '湖北',
    Hunan: '湖南',
    'Inner Mongolia': '内蒙古',
    Jiangsu: '江苏',
    Jiangxi: '江西',
    Jilin: '吉林',
    Liaoning: '辽宁',
    Ningxia: '宁夏',
    Qinghai: '青海',
    Shaanxi: '陕西',
    Shandong: '山东',
    Shanghai: '上海',
    Shanxi: '山西',
    Sichuan: '四川',
    Tianjin: '天津',
    Tibet: '西藏',
    Xinjiang: '新疆',
    Yunnan: '云南',
    Zhejiang: '浙江',
    'Hong Kong': '香港',
    Macau: '澳门',
    Taiwan: '台湾'
};

const CHINA_PROVINCES = new Set(Object.values(CHINA_PROVINCE_NAME_MAP));

function buildCorsHeaders(request, env) {
    const requestOrigin = request.headers.get('Origin') || '*';
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const origin = allowedOrigin === '*' ? requestOrigin : allowedOrigin;

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin'
    };
}

function jsonResponse(data, request, env, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            ...buildCorsHeaders(request, env),
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
        }
    });
}

async function parseBody(request) {
    if (request.method !== 'POST') {
        return {};
    }

    try {
        return await request.json();
    } catch {
        return {};
    }
}

function getCountryName(countryCode) {
    if (!countryCode || countryCode === 'XX') {
        return 'Unknown';
    }

    try {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || countryCode;
    } catch {
        return countryCode;
    }
}

function normalizeChinaProvince(region) {
    if (!region) {
        return '';
    }

    const trimmed = String(region).trim();
    if (CHINA_PROVINCES.has(trimmed)) {
        return trimmed;
    }

    const normalized = trimmed
        .replace(/ Province$/i, '')
        .replace(/ Municipality$/i, '')
        .replace(/ Autonomous Region$/i, '')
        .replace(/ Zhuang$/i, '')
        .replace(/ Hui$/i, '')
        .replace(/ Uygur$/i, '');

    return CHINA_PROVINCE_NAME_MAP[trimmed] || CHINA_PROVINCE_NAME_MAP[normalized] || trimmed;
}

function getClientIp(request) {
    return request.headers.get('CF-Connecting-IP') ||
        request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
        '0.0.0.0';
}

async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function buildVisitorContext(request) {
    const cf = request.cf || {};
    const countryCode = cf.country || 'UNKNOWN';
    const countryName = getCountryName(countryCode);
    const region = cf.region || '';
    const provinceName = countryCode === 'CN' ? normalizeChinaProvince(region) : '';
    const city = cf.city || '';

    return {
        ip: getClientIp(request),
        city,
        region,
        provinceName,
        countryCode,
        countryName,
        regionKey: countryCode === 'CN'
            ? `CN-${provinceName || 'Unknown'}`
            : countryCode
    };
}

async function getStats(env, siteKey) {
    const counter = await env.DB.prepare(
        'SELECT total_visits, unique_visitors FROM site_counters WHERE site_key = ?1'
    ).bind(siteKey).first();

    const regions = await env.DB.prepare(
        `SELECT country_code AS countryCode,
                country_name AS countryName,
                province_name AS provinceName,
                count
         FROM visitor_regions
         WHERE site_key = ?1
         ORDER BY count DESC
         LIMIT 1000`
    ).bind(siteKey).all();

    return {
        totalVisits: counter?.total_visits || 0,
        uniqueVisitors: counter?.unique_visitors || 0,
        regions: regions.results || []
    };
}

async function recordVisit(request, env, siteKey) {
    const visitor = buildVisitorContext(request);
    const userAgent = request.headers.get('User-Agent') || '';
    const visitorId = await sha256Hex(`${visitor.ip}|${userAgent}`);

    await env.DB.prepare(
        `INSERT INTO site_counters (site_key, total_visits, unique_visitors)
         VALUES (?1, 1, 0)
         ON CONFLICT(site_key)
         DO UPDATE SET total_visits = total_visits + 1`
    ).bind(siteKey).run();

    const identityResult = await env.DB.prepare(
        `INSERT OR IGNORE INTO visitor_identities
            (site_key, visitor_id, first_country_code, first_country_name, first_region_name, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, CURRENT_TIMESTAMP)`
    ).bind(
        siteKey,
        visitorId,
        visitor.countryCode,
        visitor.countryName,
        visitor.provinceName || visitor.region || visitor.countryName
    ).run();

    if ((identityResult.meta?.changes || 0) > 0) {
        await env.DB.prepare(
            `UPDATE site_counters
             SET unique_visitors = unique_visitors + 1
             WHERE site_key = ?1`
        ).bind(siteKey).run();
    }

    await env.DB.prepare(
        `INSERT INTO visitor_regions
            (site_key, region_key, country_code, country_name, province_name, count)
         VALUES (?1, ?2, ?3, ?4, ?5, 1)
         ON CONFLICT(site_key, region_key)
         DO UPDATE SET count = count + 1`
    ).bind(
        siteKey,
        visitor.regionKey,
        visitor.countryCode,
        visitor.countryName,
        visitor.provinceName
    ).run();

    const stats = await getStats(env, siteKey);
    return {
        ...stats,
        visitor
    };
}

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: buildCorsHeaders(request, env)
            });
        }

        if (!env.DB) {
            return jsonResponse({ error: 'D1 binding DB is not configured.' }, request, env, 500);
        }

        const url = new URL(request.url);
        const body = await parseBody(request);
        const siteKey = body.siteKey || url.searchParams.get('siteKey') || DEFAULT_SITE_KEY;

        try {
            if (request.method === 'GET') {
                const stats = await getStats(env, siteKey);
                return jsonResponse(stats, request, env);
            }

            if (request.method === 'POST') {
                const stats = await recordVisit(request, env, siteKey);
                return jsonResponse(stats, request, env);
            }

            return jsonResponse({ error: 'Method not allowed.' }, request, env, 405);
        } catch (error) {
            return jsonResponse({
                error: 'Visitor stats failed.',
                detail: error.message
            }, request, env, 500);
        }
    }
};
