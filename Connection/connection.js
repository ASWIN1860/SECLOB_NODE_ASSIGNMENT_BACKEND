const mongoose=require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then(res=>{
    console.log("Server Connected With MongoDB Server")
}).catch(err=>{
    console.log(err)
})