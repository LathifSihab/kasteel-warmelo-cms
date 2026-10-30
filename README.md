# Warmelo CMS

The Kasteel Warmelo website and its CMS in one SvelteKit app: the public site is server-rendered from
content in Neon Postgres, and `/admin` is where the client edits it with a live preview.

- **Stack:** SvelteKit 3 (Svelte 5) · Neon Postgres · Cloudflare Workers + R2
- **Languages:** Dutch at `/`, English at `/en/…`, German at `/de/…`
- **Admin:** `/admin`, one shared password

## How it works

```
                 ┌──────────────── Cloudflare Worker (SvelteKit) ────────────────┐
visitor ──► /, /en/tuinen …   pages render from Site (src/lib/site/site.ts)          │
                 │                 ▲ content = saved values ⟶ original site defaults  │
editor  ──► /admin            forms + live preview (/…?preview, with drafts)         │
                 │                 │ /admin/api/draft · publish · discard · upload   │
                 └─────────────────┼───────────────────────────────────────────────────┘
                                   ▼
                     Neon Postgres (content, drafts, history, messages)
                     Cloudflare R2 (uploaded images/videos, served via /media/…)
```

**Content model.** Every editable spot has a key. Translated texts are stored per language
(`nl`/`en`/`de`); everything else is language-neutral (`*`):

| Key                            | What                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| `home.hero.title`, `nav.home`… | translated text (HTML: only `<br>`, `<em>` are produced by the admin) |
| `contact:phone`                | contact details, shown on every page                                  |
| `cms:price-volwassene`         | other neutral values (prices, numbers, menu names)                    |
| `btn:home-hero-visit`          | button settings (JSON): link target, hidden, seasonal version         |
| `img:index-hero`, `fit:…`      | image URL and its crop (JSON: focus point, zoom, frame height)        |
| `link:facebook`                | external links                                                        |
| `menuprice:koffie`             | menu prices                                                           |

The **original site** is the fallback for every key (`src/lib/content/defaults.json`), so the
database only holds what the client changed, and "↺ Origineel" simply deletes the saved value. A
missing English or German text falls back to Dutch.

**Drafts → publish.** Edits are saved as drafts for the editor's session as they type. The preview
(`/…?preview`, signed-in only) shows drafts; visitors only see them after **Publiceren**. Every
published change is recorded in `content_history`.

**Seasonal buttons.** A button can have a second link and label for a date window (e.g. winter),
optionally repeating every year. The switch happens at midnight Dutch time.

## Project layout

```
src/
  routes/(site)/[[lang=lang]]/…   public pages, one +page.svelte each (generated from the old site)
  routes/admin/                   editor, login, inbox (Berichten) and the admin API
  routes/api/contact/             contact form → messages
  routes/media/[...key]/          serves uploads from the private R2 bucket (edge-cached)
  lib/site/                       Site (content resolution), pages/URLs, seasons, shared Nav/Footer
  lib/content/                    defaults.json (original content), fields.json (what the admin edits)
  lib/admin/                      editor state, field editors, admin styles
  lib/server/                     db (Neon / PGlite), content store, auth, storage, rate limiting
  hooks.server.ts                 old-URL redirects, sessions, CSRF check, security headers
scripts/
  db.ts                           migrations
  import-legacy.ts                import content saved in the old Netlify CMS
  s3.ts                           S3 client for scripts (R2's S3 API)
  legacy/convert.mjs              one-off: generated the pages/defaults/fields from the static site
  legacy/parity.mjs               checks the site against the old static site
static/assets/                    the site's CSS, images, videos and warmelo.min.js
```

## Local development

```sh
npm install
cp .env.example .env      # set ADMIN_PASSWORD and SESSION_SECRET; leave DATABASE_URL empty
npm run dev               # http://localhost:5173 — admin at /admin
```

Without `DATABASE_URL`, dev uses a local Postgres (PGlite) in `.data/` that migrates itself. Delete
`.data/` to start over. Uploads go to a local R2 bucket in `.wrangler/state`, so everything works
offline.

| Command                     | Does                                                        |
| --------------------------- | ----------------------------------------------------------- |
| `npm run check`             | type-check                                                  |
| `npm run lint` / `format`   | ESLint + Prettier                                           |
| `npm test`                  | unit tests (content resolution, seasons, publish flow)      |
| `npm run db:migrate`        | apply migrations to `DATABASE_URL` (or the local db)        |
| `npm run import:legacy`     | import content from the old CMS (dry run unless `--apply`)  |
| `npm run legacy:parity`     | compare with the old static site (needs `npm run dev`)      |
| `npm run build` / `preview` | production build / run it locally on Cloudflare's runtime   |
| `npm run gen`               | regenerate Cloudflare types after changing `wrangler.jsonc` |

## Neon

Create the project in region **`aws-eu-central-1`** (close to the Netherlands). Then, signed in
with the DRP account:

```sh
neon link --org-id <org> --project-name warmelo --region-id aws-eu-central-1
npm run db:migrate        # creates the tables
npm run db:app-role       # creates the limited "warmelo_app" role, writes APP_DATABASE_URL to .env
```

`DATABASE_URL` should be the **pooled** connection string. It is the owner role, for migrations and
local development only; the Worker connects as `warmelo_app` (`APP_DATABASE_URL`), which can read
and write the app's tables but not change the schema or create roles. Re-running `db:app-role`
gives it a new password, so set the Worker's `DATABASE_URL` secret again afterwards. Use a Neon branch per feature
(`neon checkout <name> --create`) to test migrations and imports without touching production.

## Cloudflare

```sh
npx wrangler login
npx wrangler secret put DATABASE_URL        # the APP_DATABASE_URL value from .env, not the owner one
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put SESSION_SECRET      # node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
npx wrangler r2 bucket create kasteel-warmelo-media --location weur   # uploads (binding MEDIA)
npm run build && npx wrangler deploy
```

Then point the domain at the Worker. Old URLs keep working: `/tuinen.html?lang=en` redirects to
`/en/tuinen`.

## Moving over from the old site

1. Deploy and run migrations (above).
2. Import what the client already changed in the old CMS — run it first without `--apply` to review:
   ```sh
   npm run import:legacy -- https://kasteelwarmelo.nl
   npm run import:legacy -- https://kasteelwarmelo.nl --apply
   ```
   Old uploads (`/api/cms-img?id=…`) are copied into R2 (needs an R2 API token, see `.env.example`).
3. Check the site and switch the domain.

## Changing the site

- **Edit markup or layout:** edit the page in `src/routes/(site)/[[lang=lang]]/…/+page.svelte`.
- **Make something editable:** call `c.t('new.key')` (translated) or `c.v('cms:new-key')` in the
  page, add the original text to `defaults.json`, and add a field to `fields.json` in the right
  section. The admin, preview, draft and publish flow pick it up automatically.
- **New table or column:** append a migration to `src/lib/server/db/migrations.ts` (never edit an
  applied one) and run `npm run db:migrate`.

`scripts/legacy/convert.mjs` generated the pages from the old static site once. Since the pages are now
the source, don't re-run it unless you intend to regenerate everything from `../Warmelo`.
