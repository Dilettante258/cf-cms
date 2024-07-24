import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import removeImports from 'next-remove-imports'


// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
});

export default removeImportsFun({
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
})

// /** @type {import('next').NextConfig} */
// const nextConfig = {  };

// export default nextConfig;
