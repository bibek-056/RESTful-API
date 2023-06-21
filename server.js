import express  from "express";
import { createRecord, deleteRecord, getRecord, getRecords, upadteRecord } from "./database.js";

const app = express();

app.use(express.json());

//endpoint to get all the records from the database table
app.get('/users', async (req, res) => {
    const users = await getRecords()
    res.status(200).json(users)
})

//endpoint to get one record from the database table by passing its id
app.get('/users/:id', async (req,res) => {
    const id = req.params.id
    try {
        const user = await getRecord(id)
        res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }

})

//endpoint to add a new record to the database table
app.post('/users', async (req, res) => {
    const {user_name, email, phone} = req.body
    const user = await createRecord (user_name, email, phone)
    res.status(201).json(user)
})

//endpoint to delete a record from the database table by passing its id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await deleteRecord(id)
        res.status(204).json(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})

//endpoint to update a record from the database table by passing its id
app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { user_name, email, phone } = req.body
        const user = await upadteRecord (user_name, email, phone, id)
        res.status(200).send(user)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})


//server point
app.listen(8080, () => {
    console.log('Server is running on port 8080')
})


export default app;

