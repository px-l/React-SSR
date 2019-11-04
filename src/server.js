import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serve from 'koa-static';

// 像客户端渲染一样导入 Provider 组件
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import createStore, { init } from './store';

const app = new Koa();
const router = new Router();

const conf = {
  PORT: 9999,
};

const generateHtmlStr = (reactDom, reduxState) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

    <div id="app">${reactDom}</div>
    <script>
      window.REDUX_DATA = ${JSON.stringify(reduxState)}
    </script>
    <script src="/dist/bundle.js"></script>
</body>
</html>
`;

router.get('*', (ctx) => {
  const context = {};
  const { url } = ctx.req;

  // 初始化一个 store
  const store = createStore();

  // 手动触发一下 init
  store.dispatch(init());
  // 获取首屏情况下的状态
  const reduxState = store.getState();
  // 首先把 React 组件变成一个字符串
  // eslint-disable-next-line
  const rNode = renderToString(
    // 把刚刚创建的 store 作为属性传给 Provider 组件
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  // 然后替换 template 里边的内容
  const domString = generateHtmlStr(rNode, reduxState);

  // 最后返回 html 字符串
  ctx.body = domString;
});

app.use(serve(path.resolve(__dirname, '../')));
app.use(router.routes(), router.allowedMethods());

app.listen(conf.PORT, () => {
  console.log(`The Server is listening on ${conf.PORT} now, enjoy`);
});
