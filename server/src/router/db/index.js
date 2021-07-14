const router = require("koa-router")();
import db from "../../database";
import { updateDatabase } from "../../utils/utils";
router.get("/close", async (ctx, next) => {
  db.close();
  ctx.success({ success: true });
});
router.get("/version", async (ctx, next) => {
  updateDatabase()
  ctx.body = true;
});

export default router;
