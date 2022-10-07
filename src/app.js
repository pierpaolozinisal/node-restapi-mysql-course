import express from 'express'
import morgan from 'morgan'

import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'



const app = express()

//set


//Use
app.use(morgan("dev"))
app.use(express.json())

app.use(indexRoutes)
app.use("/api", employeesRoutes)

app.get("/", (req,res) =>{
    res.redirect("/api/employees")
}) 

app.use((req,res,next) => {
    res.status(404).json({ message : "EndPoint Not Found"})
})
export default app;
