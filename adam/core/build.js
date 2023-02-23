import * as fs from 'node:fs';
import * as url from 'node:url';
import * as path from 'node:path';

import generate from './generate';

const THEME_DIR = path.join(__dirname, '..', 'theme');

if (!fs.existsSync(THEME_DIR)) {
  fs.mkdirSync(THEME_DIR);
}

export default function build() {
  const { darker, lighter } = generate();

  return Promise.all([
    fs.promises.writeFile(
      path.join(THEME_DIR, 'base.json'),
      JSON.stringify(darker, null, 4)
    ),
    fs.promises.writeFile(
      path.join(THEME_DIR, 'light.json'),
      JSON.stringify(lighter, null, 4)
    )
  ]);
}

if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
  build();
}
