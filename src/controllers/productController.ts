// FUNCIONES QUE SANITIZAN DATOS DE ENTRADA Y RESPONDEN AL CLIENTE
// LA REQUEST Y EL RESPONSE SIEMPRE ESTARAN EN LOS CONTROLLERS

import { Request, Response } from "express"
import Product from "../model/ProductModel"
import { Types } from "mongoose"

class ProductController {
  static getAllProducts = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const products = await Product.find()
      res.json({ succes: true, data: products })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static getProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.status(200).json({ success: true, data: product })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static addProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { body } = req

      const { name, description, price, category, stock } = body

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({ message: "Datos invalidos" })
      }

      const newProducto = new Product({ name, description, price, category, stock })

      await newProducto.save()
      res.status(201).json(newProducto)
    } catch (e) {
      const error = e as Error
      res.status(500).json({ error: error.message })
    }
  }

  static updateProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params
      const { body } = req

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const { name, description, price, category, stock } = body

      const updates = { name, description, price, category, stock }

      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: updatedProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static deleteProduct = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID invalido" })
      }

      const deletedProduct = await Product.findByIdAndDelete(id)

      if (!deletedProduct) {
        return res.status(404).json({ succes: false, error: "Producto no encontrado" })
      }

      res.json({ success: true, data: deletedProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ error: error.message })
    }
  }
}



export default ProductController