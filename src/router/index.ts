// routes/index.ts
import { Router, NextFunction, Request, Response } from 'express'
const router: Router = Router()
/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('respond with a resource')
})
export default router
