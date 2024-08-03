import express from 'express';
import {PORT, mongoUrl} from './config.js';
import mongoose from 'mongoose';
import {Book} from './models/bookModels.js';
import bookRoute from './routes/book.js';
import cors from 'cors';

const app = express();
app.use('/books',bookRoute);
//middleware for parsing json
app.use(express.json());

//middleware for handling CORS Policy
app.use(cors());


app.get('/',async (req,res)=>{
    // const book = await Book.findOne({title: "The Time Ships"});
    // console.log(book);
    return res.status(200).send("Hello World");

});

mongoose.connect(mongoUrl)
.then(()=>{
console.log("Database connection succeeded");
app.listen('https://library-server-22fb20411-justin-zous-projects.vercel.app/',()=>{
    console.log(`Listening on port ${PORT}`);
})
})
.catch((error)=>{
console.error(error);
})