const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.github.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/',
            },
        })
    );
    app.use(
        '/login',
        createProxyMiddleware({
            target: 'https://github.com/login',
            changeOrigin: true,
            pathRewrite: {
                '^/login': '/',
            },
        })
    );
};
