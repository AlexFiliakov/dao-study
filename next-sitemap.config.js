/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://daoreading.com',
    generateRobotsTxt: true, // This will also generate your robots.txt
    exclude: ['/admin/*', '/private/*'], // Add paths you want to exclude
    sitemapSize: 50000, // Maximum allowed is 50,000 URLs per sitemap
    // Additional configuration options...
  }