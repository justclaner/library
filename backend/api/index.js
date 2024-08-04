import express from 'express';
import {PORT, mongoUrl} from '../config.js';
import mongoose from 'mongoose';
import bookRoute from '../routes/book.js';
import cors from 'cors';
import auth from '../auth.js';

const app = express();
app.use('/books',bookRoute);
//middleware for parsing json
//app.use(express.json());
//app.use([auth]);
// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Credentials', true)
//     res.set('Access-Control-Allow-Origin', 'https://library-client-bo3ic8461-justin-zous-projects.vercel.app')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.set(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//         res.status(200).end()
//         return
//       }
//     next();
//   });

//middleware for handling CORS Policy
// app.use(cors({
//     origin: '*',
//     methods: '*',
//     allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
//     credentials: true,
//   }));


// app.get('/',async (req,res)=>{
//     // const book = await Book.findOne({title: "The Time Ships"});
//     // console.log(book);
//     return res.status(200).send("Hello World");

// });

mongoose.connect(mongoUrl)
.then(()=>{
console.log("Database connection succeeded");
app.listen(5000,()=>{
    console.log(`Listening on port ${PORT}`);
})
})
.catch((error)=>{
console.error(error);
});

export default app;