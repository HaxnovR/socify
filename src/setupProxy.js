const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: 'https://testsocify.herokuapp.com:5000'
        })
    );
};
