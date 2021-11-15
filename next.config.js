/* eslint-disable @typescript-eslint/no-var-requires */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard',
      },
    ];
  },
  images: {
    domains: ['cdn.discordapp.com'],
  },
};
