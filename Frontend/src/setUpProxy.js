const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/map"], //proxy가 필요한 path prameter를 입력합니다.(여러개일 경우 배열로 입력합니다.)
    createProxyMiddleware("/api", {
      target: "https://www.guardsafe.store", //타겟이 되는 api url를 입력합니다.
      changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
      router: {
        "/map": "https://www.guardsafe.store",
        // "/guide": "https://49.50.167.129:5001",
      },
    }),
  );
};
