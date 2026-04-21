import express from 'express'
import { matchRouter } from './routes/matches.js';
import { attachWebSocketServer } from './ws/server.js';
import http from 'http'

const app=express();
const port =8000;
const host='0.0.0.0'

const server=http.createServer(app)


app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello from the server");
})

app.use("/matches",matchRouter)


const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(port, host, () => {
    const baseUrl =
        host === '0.0.0.0'
            ? `http://localhost:${port}`
            : `http://${host}:${port}`;

    console.log(`Server is running at ${baseUrl}`);
    console.log(`WebSocket Server is running at ${baseUrl.replace('http', 'ws')}/ws`);
});