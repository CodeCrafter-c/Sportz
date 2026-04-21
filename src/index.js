import express from 'express'
import { matchRouter } from './routes/matches.js';

const app=express();
const port =8000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello from the server");
})

app.use("/matches",matchRouter)

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})