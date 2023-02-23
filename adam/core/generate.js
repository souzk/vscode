import * as fs from 'node:fs';
import * as path from 'node:path';
import { Type, DEFAULT_SCHEMA, load } from 'js-yaml';

const alpha = new Type('!alpha', {
  kind: 'sequence',
  construct: ([hex, alpha]) => hex + alpha,
  represent: ([hex, alpha]) => hex + alpha
});

const schema = DEFAULT_SCHEMA.extend([alpha]);

export default function generate() {
  const dark = fs.readFileSync(
    path.join(__dirname, '..', 'source', 'base.yaml'),
    'utf-8'
  );

  const light = fs.readFileSync(
    path.join(__dirname, '..', 'source', 'light.yaml'),
    'utf-8'
  );

  const darker = load(dark, { schema });
  const lighter = load(light, { schema });

  for (const key of Object.keys(darker.colors)) {
    if (!darker.colors.hasOwnProperty(key)) {
      delete darker.colors[key];
    }
  }

  for (const key of Object.keys(lighter.colors)) {
    if (!lighter.colors.hasOwnProperty(key)) {
      delete lighter.colors[key];
    }
  }

  return { darker, lighter };
}
