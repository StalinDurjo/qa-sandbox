import '@testConfig';
import { initServer } from './server/server';

(async function main() {
  // start local server
  await initServer();
})();
