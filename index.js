require('dotenv').config()

const express=require('express')
const cors=require('cors')
const routes=require('./routes/routes')
require('./Connection/connection')


const app=express()

app.use(cors())
app.use(express.json())
app.use(routes)


const PORT=3000

app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log(`Server running at http://localhost:${PORT}`)
    }
})