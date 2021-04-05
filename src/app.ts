import 'dotenv/config'

import express from "express"
import { router } from "./rotas"

const app = express()

app.use(express.json())
app.use(router)

export { app }