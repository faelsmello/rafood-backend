import { Router } from "express";
import productRouter from "@modules/Product/product.controller";
import userRouter from "@modules/User/user.controller";

class Routes {
  static define(router: Router): Router {
    router.use("/product", productRouter);
    router.use("/user", userRouter);

    return router;
  }
}

export default Routes.define(Router());
