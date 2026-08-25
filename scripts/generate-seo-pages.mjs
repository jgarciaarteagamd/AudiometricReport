import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import es from '../src/i18n/es.ts';
import en from '../src/i18n/en.ts';
import de from '../src/i18n/de.ts';
import fr from '../src/i18n/fr.ts';
import it from '../src/i18n/it.ts';
import pt from '../src/i18n/pt.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const translations = { es, en, de, fr, it, pt };
const languages = ['es', 'en', 'de', 'fr', 'it', 'pt'];
const views = ['home', 'calculator', 'reportGenerator', 'legalNotice', 'privacyPolicy', 'faq'];

const VIEW_TO_SLUG = {
  home: '',
  calculator: 'calculator',
  reportGenerator: 'report-generator',
  legalNotice: 'legal-notice',
  privacyPolicy: 'privacy-policy',
  faq: 'faq',
};

function getCleanPath(view, lang) {
  const slug = VIEW_TO_SLUG[view] !== undefined ? VIEW_TO_SLUG[view] : '';
  const isDefaultLang = !lang || lang === 'es';

  if (isDefaultLang) {
    return slug ? `/${slug}` : '/';
  }
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generatePages() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  let generatedCount = 0;

  for (const view of views) {
    for (const lang of languages) {
      const trans = translations[lang];
      const seoData = trans.seo?.[view] || trans.seo?.home || {};
      const title = seoData.title || 'AudiometricReport';
      const description = seoData.description || '';
      const canonicalPath = getCleanPath(view, lang);
      const canonicalUrl = `https://audiometric.report${canonicalPath}`;

      // Build hreflang tags
      const hreflangs = [
        ...languages.map(l => {
          const lPath = getCleanPath(view, l);
          return `    <link rel="alternate" hreflang="${l}" href="https://audiometric.report${lPath}" />`;
        }),
        `    <link rel="alternate" hreflang="x-default" href="https://audiometric.report${getCleanPath(view, 'es')}" />`
      ].join('\n');

      let html = baseHtml;

      // Update <html lang="...">
      html = html.replace(/<html[^>]*lang="[^"]*"[^>]*>/i, `<html lang="${lang}">`);

      // Update <title>
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

      // Update meta description
      if (html.match(/<meta[^>]*name="description"[^>]*>/i)) {
        html = html.replace(/<meta[^>]*name="description"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
      } else {
        html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(description)}" />\n</head>`);
      }

      // Update canonical link
      if (html.match(/<link[^>]*rel="canonical"[^>]*>/i)) {
        html = html.replace(/<link[^>]*rel="canonical"[^>]*href="[^"]*"[^>]*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
      } else {
        html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
      }

      // Replace existing hreflang tags
      html = html.replace(/(\s*<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*\/?>)+/gi, '\n' + hreflangs);

      // Update Open Graph
      html = html.replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
      html = html.replace(/<meta[^>]*property="og:title"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
      html = html.replace(/<meta[^>]*property="og:description"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);

      // Update Twitter Card
      html = html.replace(/<meta[^>]*name="twitter:url"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);
      html = html.replace(/<meta[^>]*name="twitter:title"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
      html = html.replace(/<meta[^>]*name="twitter:description"[^>]*content="[^"]*"[^>]*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

      // Determine target output file
      let targetFile;
      const slug = VIEW_TO_SLUG[view];

      if (lang === 'es') {
        if (!slug) {
          targetFile = path.join(distDir, 'index.html');
        } else {
          targetFile = path.join(distDir, slug, 'index.html');
        }
      } else {
        if (!slug) {
          targetFile = path.join(distDir, lang, 'index.html');
        } else {
          targetFile = path.join(distDir, lang, slug, 'index.html');
        }
      }

      const targetDir = path.dirname(targetFile);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(targetFile, html, 'utf-8');
      generatedCount++;
    }
  }

  console.log(`Successfully generated ${generatedCount} static SEO pages in dist/`);
}

generatePages();
