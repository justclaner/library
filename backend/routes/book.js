import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import {Book} from '../models/bookModels.js';
import cors from 'cors';
import auth from '../auth.js';

router.use(express.json());
router.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
router.use([auth]);
router.use((req, res, next) => {
    res.set('Access-Control-Allow-Credentials', true)
    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
      }
    next();
  });

//get all books or specific book by id
router.get('/:id?', async (req,res)=> {
    try {
        const {id} = req.params;
        
        const books = (id) ? await Book.findById(id) : await Book.find({});
        console.log(res);
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({success:false,message:e.message});
    }
})

//upload book
router.post('/', async (req,res)=> {
    const {title, author, publishYear} = req.body;
    console.log({title, author, publishYear});
    try {
        if (!title || !author || !publishYear) {
            return res.status(404).json({success:false,message:"One or more fields are missing"});
        }
        const makeBook = {
            title: title,
            author: author,
            publishYear: publishYear,
        };
        const book = await Book.create(makeBook);
        return res.status(201).send(book);
    } catch(e) {
        console.error(e);
        return res.status(500).json({success:false,message:e.message});
    }
})

//update a book
router.put('/:id', async (req,res)=>{
    try {
        const {title, author, publishYear} = req.body;
        if (!title || !author || !publishYear) {
            return res.status(404).json({success:false,message:"One or more fields are missing"});
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {return response.status(404).json({success:false, message: "Book not found"});}

        return res.status(200).json("Book updated successfully.");
    } catch(e) {
        console.error(e);
        return res.status(500).json({success:false,message:e.message});
    }
})

//delete
router.delete('/:id', async (req,res)=> {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {return response.status(404).json({success:false,message: "Book not found"});}
        return res.status(200).json("Book deleted sucessfully");
    } catch(e) {
        console.error(e);
        return res.status(500).json({success:false,message:e.message});
    }
})

export default router;
