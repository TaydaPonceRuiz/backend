import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/mongodb"
import productRouter from "./routes/productRoutes"
import authRouter from "./routes/authRouter"
import limiter from "./middleware/rateLimitMiddleware"
import morgan from "morgan"
import IUserTokenPayload from "./interfaces/IUserTokenPayload"
import dotenv from "dotenv"
dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload
    }
  }
}

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan("dev"))

// Endpoint de verificacion de api -> este endpoint sirve para verificar que el servidor este funcionando correctamente.
app.get("/", (__: Request, res: Response) => {
  res.json({ status: true })
})
// Ruta base de auteticacion -> es donde le vamos a limitar y vamos a proteger la pagina cada vez que se logue una persona, todas las rutas que comienzan con "/auth" pasan primero por el limiter, donde le vamos a limitar a la persona para loguearse con 15 minutos y 5 intentos, y luego pasa por authRouter.
app.use("/auth", limiter, authRouter)
// Ruta base de los productos -> aca se maneja las peticiones relacionadas a traves del productRouter, como por ejemplo GET, POST, PUT, DELETE, etc.
app.use("/products", productRouter)

// endpoint para el 404 -> no se encuentra el recurso
app.use((resquest, response) => {
  response.status(404).json({ success: false, error: "El recurso no se encuentra" })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectDB()
})