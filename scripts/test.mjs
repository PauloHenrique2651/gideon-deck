import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { servicePages, sitePages } from '../content/pages.mjs';
import { languages } from './build.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://www.gideonsystems.com.br';
const pages = [...sitePages, ...servicePages];
const expectedUrls = new Set();
const titlesByLanguage = new Map();
const descriptionsByLanguage = new Map();

for (const [lang, prefix] of languages) {
  for (const page of pages) {
    const pathname = '/' + [prefix, page.slug].filter(Boolean).join('/');
    const expectedCanonical = origin + pathname;
    const file = join(root, ...[prefix, page.slug].filter(Boolean), 'index.html');
    const html = await readFile(file, 'utf8');
    assert.match(html, new RegExp(`<html lang="${lang}"`), file);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: H1`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${file}: title`);
    assert.match(html, /<meta name="description" content="[^"]+">/, file);
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]+)">/)[1];
    if (!page.noindex) {
      titlesByLanguage.set(lang, [...(titlesByLanguage.get(lang) || []), title]);
      descriptionsByLanguage.set(lang, [...(descriptionsByLanguage.get(lang) || []), description]);
    }
    assert.ok(html.includes(`<link rel="canonical" href="${expectedCanonical}">`), `${file}: canonical`);
    assert.ok(html.includes('og:image') && html.includes('twitter:card'), `${file}: social metadata`);
    assert.ok(html.includes('https://wa.me/5521991060165?text='), `${file}: contextual WhatsApp`);
    if (page.kind === 'home') {
      assert.ok(html.includes('data-solution-navigator'), `${file}: solution navigator`);
      assert.ok(html.includes('data-navigator-option'), `${file}: navigator options`);
    }
    assert.ok(!html.includes('@@@'), `${file}: unresolved translation marker`);
    if (page.noindex) assert.ok(html.includes('content="noindex,follow"'), `${file}: noindex`);
    else {
      expectedUrls.add(expectedCanonical);
      assert.ok(html.includes(`hreflang="${lang}" href="${expectedCanonical}"`), `${file}: self hreflang`);
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      const data = JSON.parse(match[1]);
      assert.equal(data['@context'], 'https://schema.org');
    }
    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const target = match[1].split('#')[0].split('?')[0];
      if (!target || target === '/') continue;
      const decoded = decodeURIComponent(target);
      const targetFile = /\.[a-z0-9]+$/i.test(decoded) ? join(root, decoded.slice(1)) : join(root, decoded.slice(1), 'index.html');
      await stat(targetFile).catch(() => { throw new Error(`${file}: broken link ${target}`); });
    }
  }
}

for (const [lang, titles] of titlesByLanguage) assert.equal(new Set(titles).size, titles.length, `${lang}: duplicate titles`);
for (const [lang, descriptions] of descriptionsByLanguage) assert.equal(new Set(descriptions).size, descriptions.length, `${lang}: duplicate descriptions`);

const sitemap = await readFile(join(root,'sitemap.xml'),'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => x[1]);
assert.equal(locations.length, expectedUrls.size, 'Sitemap URL count');
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URL');
for (const url of expectedUrls) assert.ok(locations.includes(url), `Missing sitemap URL: ${url}`);
assert.ok(!sitemap.includes('/cases<') && !sitemap.includes('/blog<'), 'Noindex pages in sitemap');
const robots = await readFile(join(root,'robots.txt'),'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const analytics = await readFile(join(root,'analytics.js'),'utf8');
const interactions = await readFile(join(root,'service.js'),'utf8');
assert.ok(interactions.includes('data-solution-navigator'), 'Missing solution navigator interaction');
assert.ok(analytics.includes('G-EYX6409C61'));
for (const event of ['service_view','case_view','cta_click','quote_request','whatsapp_click','contact','form_start','form_submit','generate_lead']) assert.ok(analytics.includes(`'${event}'`), `Missing analytics event: ${event}`);
const png = await readFile(join(root,'assets','images','og-gideon.png'));
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log(`Validated ${languages.length * pages.length} pages, ${locations.length} indexable URLs, schemas, links, and analytics ID.`);
