// Builds the pt-BR home (home/, React + GSAP) and prerenders it into /index.html,
// replacing the page scripts/build.mjs generated, so crawlers get the full content without JavaScript.
import { build } from 'vite';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sitePages } from '../content/pages.mjs';
import { origin, instagram, canonical, alternateLinks, json, iconLinks, whatsappNumber } from './build.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '.home-build');
const configFile = join(root, 'home', 'vite.config.js');
const esc = (v) => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

await build({ configFile, logLevel: 'warn' });
await build({ configFile, logLevel: 'warn', build: { ssr: 'src/entry-server.jsx', outDir: join(out, 'server'), emptyOutDir: true } });
const server = await import(pathToFileURL(join(out, 'server', 'entry-server.js')).href);

const home = sitePages.find(p => p.kind === 'home');
const url = canonical('pt-BR');
const image = `${origin}/assets/images/og-gideon.png`;
const phone = `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 4)} ${whatsappNumber.slice(4, 9)}-${whatsappNumber.slice(9)}`;
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': `${origin}/#organization`, name: 'Gideon Systems', alternateName: 'Gideon',
      url: `${origin}/`, logo: `${origin}/assets/images/logo-navy.png`, image,
      slogan: 'Inteligência de Software que impulsiona negócios.',
      description: 'Software house brasileira especializada em desenvolvimento de software sob medida, sistemas empresariais, ERP, CRM, dashboards, integrações, automações e plataformas digitais.',
      telephone: phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      contactPoint: [{ '@type': 'ContactPoint', telephone: phone, contactType: 'sales', areaServed: 'BR', availableLanguage: ['Portuguese'], url: `https://wa.me/${whatsappNumber}` }],
      sameAs: [instagram],
      knowsAbout: server.SERVICES.map(([name]) => name),
    },
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'Gideon Systems', inLanguage: 'pt-BR', publisher: { '@id': `${origin}/#organization` } },
    {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: home.title, description: home.description, inLanguage: 'pt-BR',
      isPartOf: { '@id': `${origin}/#website` }, about: { '@id': `${origin}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    },
    {
      '@type': 'ItemList', '@id': `${url}#solucoes`, name: 'Soluções da Gideon Systems',
      itemListElement: server.SERVICES.map(([name, description, slug], i) => ({ '@type': 'ListItem', position: i + 1, url: canonical('pt-BR', slug), name, description })),
    },
  ],
};

const head = `<title>${esc(home.title)}</title>
<meta name="description" content="${esc(home.description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="${url}">
${alternateLinks('')}
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="Gideon Systems">
<meta property="og:title" content="${esc(home.title)}"><meta property="og:description" content="${esc(home.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Gideon Systems — Inteligência de Software que impulsiona negócios">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(home.title)}"><meta name="twitter:description" content="${esc(home.description)}"><meta name="twitter:image" content="${image}">
<meta name="geo.region" content="BR-RJ"><meta name="geo.placename" content="Rio de Janeiro">
<link rel="alternate" type="text/plain" title="Resumo para assistentes de IA" href="/llms.txt">
${iconLinks}
<link rel="preload" href="/assets/img/L0.png" as="image">
<script type="application/ld+json">${json(schema)}</script>
<script defer src="/analytics.js"></script>`;

const template = await readFile(join(out, 'client', 'index.html'), 'utf8');
const html = template.replace('<!--head-->', head).replace('<!--app-->', server.render());
await writeFile(join(root, 'index.html'), html, 'utf8');

// bundle: replace last build's hashed files
await rm(join(root, 'assets', 'home'), { recursive: true, force: true });
await mkdir(join(root, 'assets'), { recursive: true });
await cp(join(out, 'client', 'assets', 'home'), join(root, 'assets', 'home'), { recursive: true });
console.log('Prerendered the pt-BR home into /index.html.');
