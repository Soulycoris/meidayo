import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';

import router from './router';
import { run } from './database';
import { wikiLaunch } from './wiki';

const app: Koa = new Koa();

// add middleware:
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      // if (ctx.url === '/test') {
      // return '*'; // 允许来自所有域名请求
      // }
      return '*';
      // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
);

app.use(bodyParser());
app.use(router.routes());

const port = 3000;

app.listen(port, () => {
  console.log(`seccess start server`);
  console.log(`local: http://127.0.0.1:${port}`);
  run().catch((err) => console.log(err));
  wikiLaunch().catch((err) => console.log(err));
});
