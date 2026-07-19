import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://markgingrass.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
