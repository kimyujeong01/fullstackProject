const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // 첫 번째 API 엔드포인트 프록시 설정


    app.use(
        '/api/v1.0/items',
        createProxyMiddleware({
            target: 'https://laftel.net',
            changeOrigin: true,
            pathRewrite: (path, req) => {
                const itemId = path.match(/\/(\d+)\/detail/)[1];
                return `/api/v1.0/items/${itemId}/detail/`;
            }
        })
    );

    app.use(
        '/api/recommends/v2/themes/:themeId',
        createProxyMiddleware({
            target: 'https://laftel.net',
            changeOrigin: true,
            pathRewrite: (path, req) => {

                const themeId = path.match(/\/api\/recommends\/v2\/themes\/(\d+)/)[1];
                return `/api/recommends/v2/themes/${themeId}/`;
            }
        })
    );
    app.use(
        '/api/episodes/v2/list/', // 이 path로 시작하는 API 요청을 대상으로 합니다.
        createProxyMiddleware({
            target: 'https://api.laftel.net', // 프록시할 대상 서버의 주소입니다.
            changeOrigin: true,
        })
    );
    app.use(
        "/api/search/v2/daily/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 여기서는 라프텔 서버로 대체 필요
            changeOrigin: true
        })
    );

    app.use(
        '/api/v1.0/items',
        createProxyMiddleware({
            target: 'https://laftel.net',
            changeOrigin: true,
            pathRewrite: (path, req) => {
                const itemId = path.match(/\/(\d+)\/detail/)[1];
                return `/api/v1.0/items/${itemId}/detail/`;
            }
        })
    );

    app.use(
        '/api/episodes/v2/list/', // 이 path로 시작하는 API 요청을 대상으로 합니다.
        createProxyMiddleware({
            target: 'https://api.laftel.net', // 프록시할 대상 서버의 주소입니다.
            changeOrigin: true,
        })
    );

    app.use(
        "/api/carousels/v1/list/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );

    app.use(
        "/api/search/v2/daily/",
        createProxyMiddleware({
            target: "https://laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );

    app.use(
        "/api/items/v1/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );

    app.use(
        "/api/reviews/v2/list/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );

    app.use(
        "/api/search/v1/auto_complete",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );
    app.use(
        "/api/search/v3/keyword/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );



    app.use(
        "/api/search/v1/discover/",
        createProxyMiddleware({
            target: "https://api.laftel.net", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );


    app.use(
        "/user",
        createProxyMiddleware({
            target: "http://localhost:8080", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );

    app.use(
        "/aniDetail/",
        createProxyMiddleware({
            target: "http://localhost:8080", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );


    app.use(
        "/mypage/",
        createProxyMiddleware({
            target: "http://localhost:8080", // 두 번째 타겟 서버 주소
            changeOrigin: true
        })
    );


};