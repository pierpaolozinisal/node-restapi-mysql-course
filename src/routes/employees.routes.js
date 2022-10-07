import {Router } from 'express'

import {countEmployees, createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee, patchEmployee} from '../controllers/employees.controllers.js'



const router = Router()

//routes

router.get("/", (req,res) => {
    res.redirect( 301 ,"/employees")
})


router.get("/employees", getEmployees)

router.post("/employees",createEmployee)
//PUT si usa, per convenzione, per aggiornare tutti i campi del record
router.put("/employees/:id", updateEmployee)
//PATCH viene usato per aggiornare solo uno o più campi, ma non tutti insieme.
//Sia PUT sia PATCH funzionano senza problemi mella stessa maniera ma si 
//separano gli utilizzi "per convenzione".
router.patch("/employees/:id", updateEmployee)

router.delete("/employees/:id", deleteEmployee)

router.get("/employees/:id", getEmployee)

router.get("/employees/count", countEmployees)

export default router;