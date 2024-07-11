import { readFileSync } from 'fs';
import { parse } from 'yaml';

export const parseYamlToObject = (filePath: string): unknown => {
  try {
    const file = readFileSync(filePath, 'utf-8');
    return parse(file);
  } catch (error) {
    console.log(error);
  }
};
