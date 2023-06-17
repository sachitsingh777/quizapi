const express=require("express")
const app=express()
const cors=require("cors")
const { connection } = require("./db")
const { userRouter } = require("./router/user.router")

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.listen(8080,async()=>{
    try{
      await connection
      console.log("connected to the db")
    }
    catch(error){
        console.log("Not connected to the db")
    }

    console.log("server running has been port at the 8080")
})