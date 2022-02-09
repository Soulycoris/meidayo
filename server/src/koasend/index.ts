import createError from 'http-errors';
import fs from 'fs-extra';
const fsPromises = fs.promises;
const { stat } = fsPromises;
import { ParameterizedContext } from 'koa';
import { extname } from 'path';
import resolvePath from 'resolve-path';

// send方法的实现
async function send(ctx: ParameterizedContext, path: string) {
  // 先解析配置项
  const maxage = 31536000; // 就是http缓存控制Cache-Control的那个maxage
  const immutable = false; // 也是Cache-Control缓存控制的

  path = decodeURIComponent(path);

  path = resolvePath(path);
  let stats;
  try {
    stats = await stat(path);
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
    if (notfound.includes(err.code)) {
      // 创建HTTP错误对象
      throw createError(404, err);
    }
    err.status = 500;
    throw err;
  }

  // 设置Content-Length的header
  ctx.set('Content-Length', stats.size.toString());

  // 设置缓存控制header
  if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString());
  if (!ctx.response.get('Cache-Control')) {
    const directives = [`max-age=${maxage | 0}`];
    if (immutable) {
      directives.push('immutable');
    }
    ctx.set('Cache-Control', directives.join(','));
  }

  // 设置返回类型和返回内容
  if (!ctx.type) ctx.type = extname(path);
  // ctx.body = fs.createReadStream(path);
  return path;
}

export default send;
