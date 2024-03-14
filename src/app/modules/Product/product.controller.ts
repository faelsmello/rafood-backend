import { Router, Request, Response } from "express";

class ProductController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.getProducts);
  }

  private getProducts(request: Request, response: Response): void {
    response.send({
      _id: "ABC123",
      name: "Product Name",
      price: 28.9,
    });
  }
}

const productRouter = new ProductController().router;
export default productRouter;
