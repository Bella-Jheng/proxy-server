const express = require('express');
const cors = require('cors')
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();
app.use(cors())

const proxyMiddleware = createProxyMiddleware({
  target: 'https://pda.104-dev.com.tw',
  pathFilter: function (path, req) {
    return path.match('^/api')
  },
  pathRewrite: {'^/api' : '/'},
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  on: {
    proxyRes: responseInterceptor((buffer, proxyRes, req, res) => {
      return res
    }),
  },
  logger: coprnsole,
});

app.use(proxyMiddleware);

app.listen(4444, function() {
   console.log("server")
})