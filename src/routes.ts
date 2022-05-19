import { Router } from "express"
import { createUserController } from "./useCases/CreateUser/factory"

const router = Router()

router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
})


export { router }