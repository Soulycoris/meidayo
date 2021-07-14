

const router = require("koa-router")();
import unit from './unit';
import db from './db';
import redive from './redive';

router.use('/unit', unit.routes(), unit.allowedMethods());
router.use('/db', db.routes(), db.allowedMethods());
router.use('/redive', redive.routes(), redive.allowedMethods());

export default router