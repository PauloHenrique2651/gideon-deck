// One-time editorial translation helper. Build never calls a remote service.
// Review the checked-in JSON before publishing changes to high-value pages.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { servicePages, sitePages } from '../content/pages.mjs';
import { languages, ui } from './build.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const texts = new Set(Object.values(ui));
for (const page of [...sitePages, ...servicePages]) {
  for (const field of ['title','description','h1','intro','cta']) if (page[field]) texts.add(page[field]);
  for (const [heading, body] of page.sections || []) { texts.add(heading); texts.add(body); }
  for (const [question, answer] of page.faq || []) { texts.add(question); texts.add(answer); }
}

function chunks(items, limit = 2800) {
  const batches = []; let batch = []; let length = 0;
  for (const item of items) {
    if (batch.length && length + item.length > limit) { batches.push(batch); batch = []; length = 0; }
    batch.push(item); length += item.length + 20;
  }
  if (batch.length) batches.push(batch);
  return batches;
}

async function translateBatch(batch, lang) {
  const marked = batch.map((item,i) => `@@@${String(i).padStart(3,'0')}@@@ ${item.replaceAll('Gideon Systems', 'GIDEON_SYSTEMS_BRAND').replaceAll('Gideon', 'GIDEON_BRAND')}`).join('\n');
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.search = new URLSearchParams({client:'gtx', sl:'pt', tl:lang, dt:'t', q:marked}).toString();
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await fetch(url, {signal:AbortSignal.timeout(30000)});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const output = data[0].map(part => part[0]).join('');
      const pieces = [...output.matchAll(/@@@(\d{3})@@@\s*([\s\S]*?)(?=\n?@@@\d{3}@@@|$)/g)];
      if (pieces.length !== batch.length) throw new Error(`Expected ${batch.length} translations; got ${pieces.length}`);
      const result = [];
      for (const match of pieces) result[Number(match[1])] = match[2].trim().replaceAll('GIDEON_SYSTEMS_BRAND','Gideon Systems').replaceAll('GIDEON_BRAND','Gideon');
      if (result.some(value => !value)) throw new Error('Empty translation');
      return result;
    } catch (error) {
      if (attempt === 3) throw new Error(`Translation failed for ${lang}: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
}

await mkdir(join(root, 'content', 'translations'), {recursive:true});
for (const [lang] of languages.slice(1)) {
  const file = join(root, 'content', 'translations', `${lang}.json`);
  let existing = {};
  try { existing = JSON.parse(await readFile(file,'utf8')); } catch {}
  if (process.argv.includes('--refresh-brand')) {
    for (const source of Object.keys(existing)) if (source.includes('Gideon')) delete existing[source];
  }
  const missing = [...texts].filter(value => !existing[value]);
  const batches = chunks(missing);
  console.log(`${lang}: ${missing.length} strings in ${batches.length} batches`);
  for (let i=0; i<batches.length; i++) {
    const translated = await translateBatch(batches[i], lang);
    batches[i].forEach((source,index) => { existing[source] = translated[index]; });
    await writeFile(file, JSON.stringify(existing,null,2)+'\n','utf8');
    if ((i+1)%5===0 || i===batches.length-1) console.log(`${lang}: ${i+1}/${batches.length}`);
  }
}
