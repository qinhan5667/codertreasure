const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_RAW_URLS = {
  ts: 'https://raw.githubusercontent.com/microsoft/TypeScript/main/src/compiler/types.ts',
  js: 'https://raw.githubusercontent.com/tj/commander.js/master/lib/command.js',
  py: 'https://raw.githubusercontent.com/python/cpython/main/Lib/heapq.py',
  java: 'https://raw.githubusercontent.com/spring-projects/spring-framework/main/spring-core/src/main/java/org/springframework/core/io/Resource.java',
  cpp: 'https://raw.githubusercontent.com/microsoft/STL/main/stl/inc/vector',
  vue: 'https://raw.githubusercontent.com/vuejs/core/main/packages/runtime-core/src/apiWatch.ts',
  react: 'https://raw.githubusercontent.com/facebook/react/main/packages/react/index.js',
  go: 'https://raw.githubusercontent.com/golang/go/master/src/net/http/server.go',
};

const COMMENT_PREFIXES = {
  ts: ['//', '/*', '*'],
  js: ['//', '/*', '*'],
  py: ['#', '"""', "'''"],
  java: ['//', '/*', '*'],
  cpp: ['//', '/*', '*'],
  vue: ['//', '/*', '*'],
  react: ['//', '/*', '*'],
  go: ['//', '/*', '*'],
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'CoderTreasure/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

function extractFakeLines(content, lang) {
  const prefixes = COMMENT_PREFIXES[lang] || [];
  const lines = content
    .split('\n')
    .map((l) => l.trimEnd())
    .filter((l) => {
      const trim = l.trim();
      return trim.length > 0 && !prefixes.some((p) => trim.startsWith(p));
    })
    .slice(0, 12);
  return lines;
}

function loadFallback() {
  const htmlPath = path.join(__dirname, '..', 'src', 'game.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const match = html.match(/const\s+languageData\s*=\s*(\{[\s\S]*?\n\s*\});/);
  if (!match) {
    throw new Error('Could not find languageData object in src/game.html');
  }
  const objectLiteral = match[1].replace(/;\s*$/, '');
  return new Function('return ' + objectLiteral)();
}

async function generate() {
  const snippetsPath = path.join(__dirname, '..', 'src', 'snippets.json');
  let languageData;
  if (fs.existsSync(snippetsPath)) {
    languageData = JSON.parse(fs.readFileSync(snippetsPath, 'utf8'));
    console.log('[generate] loaded existing src/snippets.json');
  } else {
    languageData = loadFallback();
    console.log('[generate] extracted fallback from src/game.html');
  }

  let changed = false;
  for (const [lang, url] of Object.entries(GITHUB_RAW_URLS)) {
    if (!languageData[lang]) {
      console.log(`[generate] ${lang}: not in languageData, skipped`);
      continue;
    }
    try {
      const content = await fetchUrl(url);
      const fake = extractFakeLines(content, lang);
      if (fake.length >= 5) {
        languageData[lang].fake = fake;
        changed = true;
        console.log(`[generate] ${lang}: updated fake code from ${url} (${fake.length} lines)`);
      } else {
        console.log(`[generate] ${lang}: too few lines from ${url}, fallback kept`);
      }
    } catch (err) {
      console.log(`[generate] ${lang}: fallback kept (${err.message})`);
    }
  }

  fs.writeFileSync(snippetsPath, JSON.stringify(languageData, null, 2), 'utf8');
  console.log(`[generate] wrote ${snippetsPath} (${changed ? 'enhanced' : 'fallback'})`);
}

generate().catch((err) => {
  console.error('[generate] failed:', err);
  process.exit(1);
});
