import { Router } from "express"

const router = Router()

router.get('/users', (request, response) => {
  response.send({hello: "world"})
})


export { router }