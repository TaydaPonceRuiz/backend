import { Router } from "express"
import AuthController from "../controllers/authController"

const authRouter = Router()

// endpoint register -> en este se registra un usuario donde se va a recibir un emails, contraseñas, etc, que devuelve un usuraio creado o un mesanje de exito y a veces un token
authRouter.post("/register", AuthController.register)
// endpoint login -> aca se autentica el usuraio donde se verifica las credenciales, donde se genera un token si es que son correctos y donde devuelve el token de autenticacion y datos basicos
authRouter.post("/login", AuthController.login)

export default authRouter