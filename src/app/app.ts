import express, { NextFunction, Request, Response } from 'express';
const app = express()


//* parsers 
app.use(express.json())
app.use(express.text())


//* middlewares

const logger = (req : Request, res : Response, next : NextFunction)=>{
  console.log(req.url, req.method, req.hostname);
  next()
}

app.get('/', logger, (req : Request, res : Response) => {
  console.log(req.query);
  res.send('Hello developers!')
})


app.post('/', (req : Request, res : Response)=>{
  console.log(req.body);
  res.json({
    "Hello" : "this Is Hello"
  })
})

export default app;