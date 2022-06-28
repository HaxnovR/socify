const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config()

const server = process.env.SERVER;

module.exports = function (app) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: `${server}` // server location
        })
    );
};
