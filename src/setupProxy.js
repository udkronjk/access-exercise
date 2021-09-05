const createProxyMiddleware = require('http-proxy-middleware');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.github.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/',
            },
            onProxyReq: function (proxyReq, req, res) {
                proxyReq.setHeader('User-Agent', process.env.REACT_APP_USER_AGENT);
            },
        })
    );
    app.use(
        '/login',
        createProxyMiddleware({
            target: 'https://github.com',
            changeOrigin: true,
            onProxyReq: function (proxyReq, req, res) {
                proxyReq.setHeader('User-Agent', process.env.REACT_APP_USER_AGENT);
                proxyReq.setHeader('Accept', 'application/json');
            },
        })
    );
};
