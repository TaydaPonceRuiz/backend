import { Router } from "express";
import ProductController from "../controllers/productController";
import authMiddleware from "../middleware/authMiddleware";

const productRouter = Router()

// endpoint de peticiones a los productos->
// en este endpoint vamos a llamar a todos los producto para que aparazecan
productRouter.get("/", ProductController.getAllProducts)
// en este endpoint vamos a llamar a un producto mediante su id
productRouter.get("/:id", ProductController.getProduct)
// en este endpoint vamos a añadir un producto pero antes de añadirlo, hay que loguearse
productRouter.post("/", authMiddleware, ProductController.addProduct)
// en este endpoint vamos a actualizar a un producto mediante su id pero antes de añadirlo, hay que loguearse
productRouter.patch("/:id", authMiddleware, ProductController.updateProduct)
// en este endpoint vamos a borrar un producto mediante su id pero antes de añadirlo, hay que loguearse
productRouter.delete("/:id", authMiddleware, ProductController.deleteProduct)

export default productRouter