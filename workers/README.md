# Visitor Stats Worker

This Worker stores visitor counts in Cloudflare D1 and returns data for the homepage maps.

## Deploy

1. Install or run Wrangler:

```bash
npm create cloudflare@latest
```

or use:

```bash
npx wrangler --version
```

2. Log in:

```bash
npx wrangler login
```

3. Create the D1 database:

```bash
npx wrangler d1 create syuan8889_visitor_stats
```

4. Copy the returned `database_id` into `wrangler.toml`.

5. Create the tables:

```bash
npx wrangler d1 execute syuan8889_visitor_stats --remote --file workers/schema.sql
```

6. Deploy the Worker:

```bash
npx wrangler deploy
```

7. Copy the deployed Worker URL into `VISITOR_STATS_CONFIG.workerApiUrl` in `script.js`.

Example:

```js
const VISITOR_STATS_CONFIG = {
    workerApiUrl: 'https://syuan8889-visitor-stats.your-subdomain.workers.dev',
    siteKey: 'syuan8889-homepage'
};
```

The Worker returns the current visitor IP to the browser, but D1 only stores a hashed visitor id and aggregated region counts.
