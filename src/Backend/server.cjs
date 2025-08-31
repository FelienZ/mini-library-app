const express = require('express');
const app = express();
const itemRoutes = require('./routes/itemRoutes.cjs')
const cors = require('cors')

app.use(express.json())

require('dotenv').config()
const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (req, res)=> {
    res.json({message: 'Hello World'})
})

app.use(cors({origin: 'http://localhost:5173'}))
app.use('/api/books', itemRoutes)

app.use((req,res)=> {
    res.json('Cannot Get /PATH')
})

app.listen(port, host, ()=>{
    console.log(`Server Run at http://${host}:${port}`)
})