const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config()

const port = process.env.PORT || 5000;

module.exports = function (app) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            // target: 'http://localhost:3000' // server location
            target: `https://testsocify.herokuapp.com` // server location
        })
    );
};
