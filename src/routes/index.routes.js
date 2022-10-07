import {Router} from 'express'
import {pingServer} from '../controllers/index.controllers.js'

const router =Router()

router.get("/ping", pingServer)

export default router
