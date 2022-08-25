// cors error 마주하게 되면 설정해볼법한 proxy 코드
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://dapi.kakao.com/v3",
      changeOrigin: true,
    })
  );
}