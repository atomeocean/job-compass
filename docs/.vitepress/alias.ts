import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url)); // => docs/.vitepress

export const alias = {
  // 习惯用法：语义化别名
  '@ao-types': resolve(__dirname, 'theme/types'),
  '@ao-theme': resolve(__dirname, 'theme'),
  '@ao-utils': resolve(__dirname, 'theme/utils'),
  '@ao-composables': resolve(__dirname, 'theme/composables'),
  '@ao-components': resolve(__dirname, 'theme/components'),
  '@ao-constants': resolve(__dirname, 'theme/constants')
};