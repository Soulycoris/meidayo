import unit from './unit';
import db from './db';
import assets from './assets';
import koaRouter from 'koa-router';
const router = new koaRouter();

router.use('/unit', unit.routes(), unit.allowedMethods());
router.use('/db', db.routes(), db.allowedMethods());
router.use('/assets', assets.routes(), assets.allowedMethods());

export default router;
