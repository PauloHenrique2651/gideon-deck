import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homeNavigator, servicePages, sitePages } from '../content/pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://www.gideonsystems.com.br';
const instagram = 'https://www.instagram.com/oficial.gideon/';
const whatsappNumber = '5521991060165';

export const languages = [
  ['pt-BR', '', 'Português (Brasil)'], ['pt-PT', 'pt-pt', 'Português (Portugal)'],
  ['en', 'en', 'English'], ['es', 'es', 'Español'], ['de', 'de', 'Deutsch'],
  ['fr', 'fr', 'Français'], ['it', 'it', 'Italiano'], ['nl', 'nl', 'Nederlands'],
  ['pl', 'pl', 'Polski'], ['ja', 'ja', '日本語'], ['zh-CN', 'zh', '中文'],
  ['ko', 'ko', '한국어'], ['ru', 'ru', 'Русский'], ['ar', 'ar', 'العربية']
];

const ui = {
  solutions: 'Soluções', projects: 'Projetos', insights: 'Conteúdo', about: 'Sobre',
  contact: 'Contato', home: 'Início', breadcrumbSolutions: 'Soluções',
  talk: 'Falar com a Gideon', explore: 'Explore as soluções', related: 'Soluções relacionadas',
  questions: 'Perguntas frequentes', next: 'O próximo passo é uma conversa clara sobre o seu projeto.',
  nextText: 'Conte o que trava sua operação hoje. Vamos entender o cenário, as ferramentas que você usa e o caminho mais útil para sua empresa.',
  quote: 'Solicitar orçamento', language: 'Idioma', location: 'Software house no Rio de Janeiro · Atendimento em todo o Brasil',
  brand: 'Inteligência de Software que impulsiona negócios.', serviceLabel: 'Soluções digitais para empresas',
  allServices: 'Todas as soluções', direct: 'Contato direto pelo WhatsApp',
  whatsappMessage: 'Olá, vim pelo site da Gideon Systems e gostaria de conversar sobre este projeto:',
  categories: 'ERP · CRM · Automação · Integrações · IA · Tecnologia empresarial',
  pending: 'A publicação de cases e artigos depende de documentação e revisão editorial.',
  navigation: 'Navegação principal', menu: 'Abrir menu', skip: 'Ir para o conteúdo',
  navigatorLabel: 'Navegador de soluções', navigatorOptions: 'Soluções para explorar'
};

const allPages = [...sitePages, ...servicePages.map(page => ({...page, kind: 'service'}))];
const bySlug = new Map(allPages.map(page => [page.slug, page]));

function esc(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
function json(value) { return JSON.stringify(value).replaceAll('<', '\\u003c'); }
function pathFor(lang, slug = '') {
  const prefix = languages.find(x => x[0] === lang)?.[1];
  return `/${[prefix, slug].filter(Boolean).join('/')}${slug || prefix ? '' : ''}` || '/';
}
function canonical(lang, slug = '') { return origin + pathFor(lang, slug); }
function pageFile(lang, slug = '') {
  const prefix = languages.find(x => x[0] === lang)?.[1];
  return join(root, ...[prefix, slug].filter(Boolean), 'index.html');
}
function alternateLinks(slug) {
  return languages.map(([code]) => `<link rel="alternate" hreflang="${code}" href="${canonical(code, slug)}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${canonical('pt-BR', slug)}">`;
}

async function run() {
  const translations = new Map();
  for (const [lang] of languages.slice(1)) {
    const file = join(root, 'content', 'translations', `${lang}.json`);
    translations.set(lang, JSON.parse(await readFile(file, 'utf8')));
  }
  const t = (value, lang) => {
    if (lang === 'pt-BR') return value;
    const translated = translations.get(lang)[value];
    if (!translated) throw new Error(`Tradução ausente (${lang}): ${value}`);
    return translated;
  };
  const link = (slug, lang) => pathFor(lang, slug);
  const whatsapp = (page, lang) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${t(ui.whatsappMessage,lang)} ${t(page.h1,lang)}`)}`;
  const siteNav = (lang) => `<nav class="site-nav" aria-label="${esc(t(ui.navigation, lang))}">
    <a href="${link('desenvolvimento-de-software-sob-medida', lang)}">${esc(t(ui.solutions, lang))}</a>
    <a href="${link('cases', lang)}">${esc(t(ui.projects, lang))}</a>
    <a href="${link('blog', lang)}">${esc(t(ui.insights, lang))}</a>
    <a href="${link('sobre', lang)}">${esc(t(ui.about, lang))}</a>
    <a href="${link('contato', lang)}">${esc(t(ui.contact, lang))}</a>
  </nav>`;
  const langSelect = (slug, lang) => `<label class="language-switch"><span>${esc(t(ui.language, lang))}</span><select aria-label="${esc(t(ui.language, lang))}" data-language-switch>
    ${languages.map(([code, , name]) => `<option value="${link(slug, code)}"${code === lang ? ' selected' : ''}>${esc(name)}</option>`).join('')}
  </select></label>`;
  const breadcrumb = (page, lang) => {
    const segments = [{name: t(ui.home, lang), url: canonical(lang)}];
    if (page.kind === 'service') segments.push({name: t(ui.breadcrumbSolutions, lang), url: canonical(lang, 'desenvolvimento-de-software-sob-medida')});
    segments.push({name: t(page.h1, lang), url: canonical(lang, page.slug)});
    const list = { '@type': 'BreadcrumbList', itemListElement: segments.map((item, i) => ({'@type':'ListItem',position:i+1,name:item.name,item:item.url})) };
    const visual = segments.map((s,i) => i === segments.length-1 ? `<span aria-current="page">${esc(s.name)}</span>` : `<a href="${s.url}">${esc(s.name)}</a>`).join('<span aria-hidden="true">/</span>');
    return { visual: `<nav class="breadcrumbs" aria-label="Breadcrumb">${visual}</nav>`, schema: list };
  };
  for (const [lang] of languages) {
    for (const page of allPages) {
      const url = canonical(lang, page.slug);
      const title = t(page.title, lang);
      const description = t(page.description, lang);
      const bc = page.kind === 'home' ? null : breadcrumb(page, lang);
      const schema = [];
      if (bc) schema.push(bc.schema);
      if (page.kind === 'service') {
        schema.push({'@type':'Service','@id':url+'#service',name:t(page.h1,lang),description:t(page.intro,lang),url,provider:{'@id':origin+'/#organization'},areaServed:{'@type':'Country',name:'Brazil'}});
        schema.push({'@type':'FAQPage',mainEntity:page.faq.map(([q,a]) => ({'@type':'Question',name:t(q,lang),acceptedAnswer:{'@type':'Answer',text:t(a,lang)}}))});
      }
      if (page.kind === 'home') {
        schema.push({'@type':'WebPage',name:title,url,inLanguage:lang,isPartOf:{'@id':origin+'/#website'}});
        if (lang === 'pt-BR') schema.push(
          {'@type':'Organization','@id':origin+'/#organization',name:'Gideon Systems',url:origin+'/',logo:origin+'/assets/images/logo-navy.png',description:'Software house brasileira especializada em desenvolvimento de software sob medida, sistemas empresariais, ERP, CRM, dashboards, integrações, automações e plataformas digitais.',sameAs:[instagram]},
          {'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Gideon Systems',inLanguage:'pt-BR',publisher:{'@id':origin+'/#organization'}}
        );
      }
      const serviceGrid = `<div class="service-grid">${servicePages.map((item,i) => `<a class="service-card" href="${link(item.slug,lang)}"><span class="service-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(t(item.h1,lang))}</h3><p>${esc(t(item.description,lang))}</p><span class="service-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
      const solutionNavigator = page.kind === 'home' ? `<section class="solution-navigator" data-solution-navigator aria-labelledby="solution-navigator-title">
        <div class="solution-navigator-copy"><p class="eyebrow">${esc(t(homeNavigator.kicker,lang))}</p><h2 id="solution-navigator-title">${esc(t(homeNavigator.title,lang))}</h2><p>${esc(t(homeNavigator.text,lang))}</p></div>
        <div class="solution-navigator-stage" id="navigator-panel" role="tabpanel" aria-labelledby="navigator-option-0" aria-live="polite"><canvas data-navigator-canvas aria-hidden="true"></canvas><div class="navigator-orbit" aria-hidden="true"><span></span><span></span><span></span></div><div class="navigator-card"><p class="navigator-label" data-navigator-label>${esc(t(homeNavigator.options[0].label,lang))}</p><h3 data-navigator-title>${esc(t(homeNavigator.options[0].title,lang))}</h3><p data-navigator-text>${esc(t(homeNavigator.options[0].text,lang))}</p><a class="button-primary" data-navigator-cta data-cta data-cta-location="solution-navigator" href="${link(homeNavigator.options[0].slug,lang)}">${esc(t(homeNavigator.cta,lang))}<span aria-hidden="true">↗</span></a></div></div>
        <div class="navigator-options" role="tablist" aria-label="${esc(t(ui.navigatorOptions,lang))}">${homeNavigator.options.map((option,index) => `<button type="button" role="tab" id="navigator-option-${index}" aria-controls="navigator-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-navigator-option data-label="${esc(t(option.label,lang))}" data-title="${esc(t(option.title,lang))}" data-text="${esc(t(option.text,lang))}" data-href="${link(option.slug,lang)}"><span>${String(index + 1).padStart(2,'0')}</span>${esc(t(option.label,lang))}</button>`).join('')}</div>
      </section>` : '';
      const sections = page.sections?.map(([heading, body]) => `<section class="content-section"><h2>${esc(t(heading,lang))}</h2><p>${esc(t(body,lang))}</p></section>`).join('') || '';
      const related = page.related?.length ? `<section class="related"><h2>${esc(t(ui.related,lang))}</h2><div class="related-links">${page.related.map(slug => `<a href="${link(slug,lang)}">${esc(t(bySlug.get(slug).h1,lang))}<span aria-hidden="true">↗</span></a>`).join('')}</div></section>` : '';
      const faq = page.faq?.length ? `<section class="faq"><h2>${esc(t(ui.questions,lang))}</h2>${page.faq.map(([q,a]) => `<details><summary>${esc(t(q,lang))}</summary><p>${esc(t(a,lang))}</p></details>`).join('')}</section>` : '';
      const mainContent = page.kind === 'home' ? `<div class="editorial">${sections}</div>${solutionNavigator}<section class="solution-index"><h2>${esc(t(ui.explore,lang))}</h2>${serviceGrid}</section>` :
        page.kind === 'service' ? `<div class="editorial">${sections}</div>${faq}${related}` :
        `<div class="editorial">${sections}</div>${page.kind === 'contact' ? '' : `<section class="solution-index"><h2>${esc(t(ui.explore,lang))}</h2>${serviceGrid}</section>`}`;
      const cta = page.kind === 'cases' || page.kind === 'blog' ? `<p class="pending-note">${esc(t(ui.pending,lang))}</p>` : '';
      const html = `<!doctype html>
<html lang="${lang}"${lang === 'ar' ? ' dir="rtl"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
<link rel="canonical" href="${url}">
${page.noindex ? '' : alternateLinks(page.slug)}
<meta property="og:type" content="website"><meta property="og:locale" content="${lang.replace('-', '_')}"><meta property="og:site_name" content="Gideon Systems">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${origin}/assets/images/og-gideon.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${origin}/assets/images/og-gideon.png">
<link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#1C3458">
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/service.css">
${schema.length ? `<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':schema})}</script>` : ''}
<script defer src="/analytics.js"></script><script defer src="/service.js"></script>
</head>
<body data-page-kind="${page.kind}" data-service="${page.kind === 'service' ? page.slug : ''}">
<a class="skip-link" href="#main">${esc(t(ui.skip,lang))}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${link('',lang)}" aria-label="Gideon Systems"><img src="/assets/images/logo-navy.png" width="32" height="32" alt=""><span>GIDEON <small>SYSTEMS</small></span></a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="${esc(t(ui.menu,lang))}"><span></span><span></span></button><div class="menu-panel" id="site-menu">${siteNav(lang)}${langSelect(page.slug,lang)}</div></div></header>
<main id="main">
<div class="page-shell">${bc ? bc.visual : ''}<section class="page-hero"><div class="hero-text"><p class="eyebrow">${esc(t(ui.serviceLabel,lang))}</p><h1>${esc(t(page.h1,lang))}</h1><p class="lead">${esc(t(page.intro,lang))}</p><div class="hero-actions"><a class="button-primary" href="${whatsapp(page,lang)}" target="_blank" rel="noopener noreferrer" data-quote data-cta-location="hero">${esc(t(page.cta || ui.talk,lang))}<span aria-hidden="true">↗</span></a>${page.kind === 'home' ? `<a class="button-secondary" href="#solutions">${esc(t(ui.explore,lang))}</a>` : ''}</div><p class="cta-note">${esc(t(ui.direct,lang))}</p></div><div class="hero-panel" aria-hidden="true"><div class="hero-panel-inner"><span>G</span><i></i></div></div></section>
<div id="solutions">${mainContent}</div>${cta}
</div><section class="closing-cta"><div><p class="eyebrow">GIDEON SYSTEMS</p><h2>${esc(t(ui.next,lang))}</h2><p>${esc(t(ui.nextText,lang))}</p></div><a href="${whatsapp(page,lang)}" target="_blank" rel="noopener noreferrer" data-quote data-cta-location="footer">${esc(t(ui.quote,lang))}<span aria-hidden="true">↗</span></a></section>
</main>
<footer class="site-footer"><div><a class="footer-brand" href="${link('',lang)}">GIDEON SYSTEMS</a><p>${esc(t(ui.brand,lang))}</p><p>${esc(t(ui.location,lang))}</p></div><div><a href="${instagram}" target="_blank" rel="noopener noreferrer">Instagram</a><a href="${whatsapp(page,lang)}" target="_blank" rel="noopener noreferrer" data-cta-location="footer">WhatsApp</a><a href="${link('contato',lang)}">${esc(t(ui.contact,lang))}</a></div></footer>
</body></html>`;
      const file = pageFile(lang, page.slug);
      await mkdir(dirname(file), {recursive:true});
      await writeFile(file, html, 'utf8');
    }
  }
  const routes = allPages.filter(page => !page.noindex).map(page => page.slug);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes.flatMap(slug => languages.map(([lang]) => `<url><loc>${canonical(lang,slug)}</loc>${languages.map(([code]) => `<xhtml:link rel="alternate" hreflang="${code}" href="${canonical(code,slug)}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${canonical('pt-BR',slug)}"/></url>`)).join('\n')}\n</urlset>`;
  await writeFile(join(root,'sitemap.xml'), sitemap, 'utf8');
  await writeFile(join(root,'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');
  console.log(`Generated ${languages.length * allPages.length} localized pages and ${routes.length * languages.length} sitemap URLs.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === join(process.cwd(), process.argv[1]).replaceAll('\\','/')) run();
else if (process.argv[1]?.endsWith('build.mjs')) run();

export { ui, allPages };
