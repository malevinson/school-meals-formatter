# Meal Calendar

Viewer: the site root. Admin: add `#admin` to the URL (e.g. https://your-site.netlify.app/#admin).

## Deploy (one time)
1. Push this folder to a GitHub repo, then in Netlify: Add new site -> Import from Git -> pick the repo.
   (No build command needed. Publish directory: public. Functions: netlify/functions.)
   Or with the CLI: `npm i -g netlify-cli && netlify login && netlify init && netlify deploy --prod`

## Monthly update
Open https://your-site.netlify.app/#admin, paste the calendar HTML, Build preview, then Publish for everyone.
Visitors see the new menu on their next page load.

## Fallback without the server
If publishing isn't available, the page downloads menu.json. Put it next to index.html in `public/` and re-deploy.
