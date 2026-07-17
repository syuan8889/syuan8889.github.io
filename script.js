// 移动端导航菜单切�?
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效�?
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动时显示元素动�?
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.research-card, .publication-item, .project-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 添加打字机效果到标题
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后启动打字机效果
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// 添加数字计数动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// 当统计数字进入视口时启动计数动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetNumber = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetNumber);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// 添加页面滚动进度�?
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 页面加载完成后创建滚动进度条
document.addEventListener('DOMContentLoaded', createScrollProgress);

// 添加返回顶部按钮
function createBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 悬停效果
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.background = '#4338ca';
        backToTopBtn.style.transform = 'translateY(-2px)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.background = '#4f46e5';
        backToTopBtn.style.transform = 'translateY(0)';
    });
}

// 页面加载完成后创建返回顶部按�?
document.addEventListener('DOMContentLoaded', createBackToTop);

// 可点击联系方式功�?
function initClickableContacts() {
    const clickableContacts = document.querySelectorAll('.clickable-contact');
    
    clickableContacts.forEach(contact => {
        contact.addEventListener('click', function() {
            const type = this.dataset.type;
            const value = this.dataset.value;
            
            // 直接复制到剪贴板
            copyToClipboard(value, this);
        });
        
        // 添加悬停提示
        contact.addEventListener('mouseenter', function() {
            showCopyTooltip(this, 'Click to copy');
        });
        
        contact.addEventListener('mouseleave', function() {
            hideCopyTooltip(this);
        });
    });
}

// 复制到剪贴板功能
function copyToClipboard(text, element) {
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showCopyTooltip(element, 'Copied!');
        }).catch(() => {
            fallbackCopyToClipboard(text, element);
        });
    } else {
        // 降级方案
        fallbackCopyToClipboard(text, element);
    }
}

// 降级复制方案
function fallbackCopyToClipboard(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyTooltip(element, 'Copied!');
    } catch (err) {
        showCopyTooltip(element, 'Copy failed');
    }
    
    document.body.removeChild(textArea);
}

// 显示复制提示
function showCopyTooltip(element, message) {
    // 移除现有的提�?    hideCopyTooltip(element);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = message;
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    // 显示动画
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        hideCopyTooltip(element);
    }, 2000);
}

// 隐藏复制提示
function hideCopyTooltip(element) {
    const tooltip = element.querySelector('.copy-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }
}

// 页面加载完成后初始化可点击联系方�?
document.addEventListener('DOMContentLoaded', initClickableContacts);

// 图片全屏显示功能
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const publicationImages = document.querySelectorAll('.publication-image');
    
    // 点击图片显示全图
    publicationImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function() {
            const fullImageSrc = this.dataset.fullImage;
            const altText = this.querySelector('.paper-img').alt;
            
            modal.style.display = 'block';
            modalImg.src = fullImageSrc;
            modalCaption.textContent = altText;
            
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 关闭模态框
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 点击关闭按钮
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关�?    
document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// 页面加载完成后初始化图片模态框
document.addEventListener('DOMContentLoaded', initImageModal);

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // 从localStorage获取保存的主题，默认为light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // 应用保存的主�?    
body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 点击切换主题
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked!'); // 调试信息
        
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        console.log('Current theme:', currentTheme); // 调试信息
        console.log('New theme:', newTheme); // 调试信息
        
        // 更新主题
        body.setAttribute('data-theme', newTheme);
        
        // 保存到localStorage
        localStorage.setItem('theme', newTheme);
        
        // 更新图标
        updateThemeIcon(newTheme);
        
        // 添加切换动画
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        console.log('Theme updated to:', body.getAttribute('data-theme')); // 调试信息
    });
}

// 更新主题图标
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to dark theme';
    } else {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to light theme';
    }
}

// 页面加载完成后初始化主题切换
document.addEventListener('DOMContentLoaded', initThemeToggle);

// Visitor statistics through Cloudflare Workers + D1.
// After deploying the Worker, paste its public URL into workerApiUrl.
const VISITOR_STATS_CONFIG = {
    workerApiUrl: 'https://syuan8889-visitor-stats.syuan8889.workers.dev',
    siteKey: 'syuan8889-homepage'
};

const WORLD_MAP_NAME_OVERRIDES = {
    'United States': 'United States of America',
    'Russian Federation': 'Russia',
    Czechia: 'Czech Rep.',
    'South Korea': 'Korea',
    'North Korea': 'Dem. Rep. Korea',
    Laos: 'Lao PDR',
    Vietnam: 'Vietnam',
    Iran: 'Iran',
    Syria: 'Syria',
    Tanzania: 'Tanzania',
    'Democratic Republic of the Congo': 'Dem. Rep. Congo',
    Congo: 'Congo',
    'Central African Republic': 'Central African Rep.',
    'South Sudan': 'S. Sudan',
    'Bosnia and Herzegovina': 'Bosnia and Herz.',
    'Dominican Republic': 'Dominican Rep.',
    'Equatorial Guinea': 'Eq. Guinea',
    'Solomon Islands': 'Solomon Is.',
    'Falkland Islands': 'Falkland Is.',
    'Ivory Coast': "Cote d'Ivoire"
};

function isVisitorWorkerConfigured() {
    return Boolean(VISITOR_STATS_CONFIG.workerApiUrl);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function formatNumber(value) {
    const number = Number(value) || 0;
    return number.toLocaleString();
}

function normalizeWorldMapName(countryName, countryCode) {
    if (countryCode === 'CN') {
        return 'China';
    }
    return WORLD_MAP_NAME_OVERRIDES[countryName] || countryName || 'Unknown';
}

async function getLocalVisitorPreview() {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
        throw new Error('IP lookup failed');
    }

    const location = await response.json();
    const visits = Number(localStorage.getItem('localVisitCount') || '0') + 1;
    localStorage.setItem('localVisitCount', String(visits));

    const countryCode = location.country_code || location.country || 'UNKNOWN';
    const countryName = location.country_name || 'Unknown';
    const regionName = location.region || '';

    return {
        totalVisits: visits,
        uniqueVisitors: 1,
        visitor: {
            ip: location.ip || 'Unknown IP',
            city: location.city || '',
            region: regionName,
            provinceName: countryCode === 'CN' ? regionName : '',
            countryCode,
            countryName
        },
        regions: [{
            countryCode,
            countryName,
            worldMapName: normalizeWorldMapName(countryName, countryCode),
            provinceName: countryCode === 'CN' ? regionName : '',
            count: visits
        }]
    };
}

async function fetchWorkerVisitorStats() {
    const endpoint = new URL(VISITOR_STATS_CONFIG.workerApiUrl);
    endpoint.searchParams.set('siteKey', VISITOR_STATS_CONFIG.siteKey);

    const response = await fetch(endpoint.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteKey: VISITOR_STATS_CONFIG.siteKey })
    });

    if (!response.ok) {
        throw new Error(`Visitor worker failed: ${response.status}`);
    }

    return response.json();
}

function renderVisitorMaps(regions) {
    if (!window.echarts) {
        setText('visitorMapStatus', 'Map library unavailable');
        return;
    }

    const worldElement = document.getElementById('worldVisitorMap');
    const chinaElement = document.getElementById('chinaVisitorMap');
    if (!worldElement || !chinaElement) {
        return;
    }

    const worldData = regions.reduce((items, region) => {
        const mapName = normalizeWorldMapName(region.countryName, region.countryCode);
        const existing = items.find(item => item.name === mapName);
        if (existing) {
            existing.value += region.count;
        } else {
            items.push({ name: mapName, value: region.count });
        }
        return items;
    }, []);

    const chinaData = regions
        .filter(region => region.countryCode === 'CN' && region.provinceName)
        .map(region => ({ name: region.provinceName, value: region.count }));

    const maxValue = Math.max(1, ...regions.map(region => Number(region.count) || 0));
    const mapThemeText = getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#666';
    const accentColor = getComputedStyle(document.body).getPropertyValue('--accent-color').trim() || '#4f46e5';

    try {
        const worldChart = echarts.init(worldElement);
        worldChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}' },
            visualMap: {
                min: 0,
                max: maxValue,
                left: 10,
                bottom: 10,
                text: ['High', 'Low'],
                calculable: true,
                inRange: { color: ['#dbeafe', '#60a5fa', '#4f46e5'] },
                textStyle: { color: mapThemeText }
            },
            series: [{
                name: 'Visitors',
                type: 'map',
                map: 'world',
                roam: true,
                emphasis: { label: { show: false } },
                itemStyle: { borderColor: '#ffffff', borderWidth: 0.5 },
                data: worldData
            }]
        });

        const chinaChart = echarts.init(chinaElement);
        chinaChart.setOption({
            tooltip: { trigger: 'item', formatter: '{b}: {c}' },
            visualMap: {
                min: 0,
                max: maxValue,
                left: 0,
                bottom: 0,
                show: chinaData.length > 0,
                inRange: { color: ['#ecfeff', '#67e8f9', accentColor] },
                textStyle: { color: mapThemeText }
            },
            series: [{
                name: 'China Visitors',
                type: 'map',
                map: 'china',
                roam: true,
                label: { show: false },
                emphasis: { label: { show: true } },
                itemStyle: { borderColor: '#ffffff', borderWidth: 0.5 },
                data: chinaData
            }]
        });

        setText('visitorMapStatus', 'Updated');
        window.addEventListener('resize', () => {
            worldChart.resize();
            chinaChart.resize();
        });
    } catch (error) {
        setText('visitorMapStatus', 'Map data unavailable');
        console.warn('Visitor map render failed:', error);
    }
}

async function initVisitorStats() {
    if (!document.getElementById('visitors')) {
        return;
    }

    try {
        const stats = isVisitorWorkerConfigured()
            ? await fetchWorkerVisitorStats()
            : await getLocalVisitorPreview();

        const visitor = stats.visitor || {};
        const locationText = [
            visitor.city,
            visitor.provinceName || visitor.region,
            visitor.countryName
        ].filter(Boolean).join(', ');

        setText('visitorIp', visitor.ip || 'Unknown IP');
        setText('visitorLocation', locationText || 'Unknown location');
        setText('totalVisits', formatNumber(stats.totalVisits));
        setText('uniqueVisitors', formatNumber(stats.uniqueVisitors));
        setText('visitorMapStatus', isVisitorWorkerConfigured() ? 'Updated' : 'Local preview only');
        renderVisitorMaps(stats.regions || []);
    } catch (error) {
        setText('visitorIp', 'Unavailable');
        setText('visitorLocation', 'Visitor lookup failed');
        setText('visitorMapStatus', 'Stats unavailable');
        setText('totalVisits', '--');
        setText('uniqueVisitors', '--');
        console.warn('Visitor stats failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', initVisitorStats);
