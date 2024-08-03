import express from 'express';
const router = express();
import mongoose from 'mongoose';
import {Book} from '../models/bookModels.js';
import cors from 'cors';

router.use(express.json());
router.use(cors());


//get all books or specific book by id
router.get('/:id?', async (req,res)=> {
    try {
        const {id} = req.params;
        
        const books = (id) ? await Book.findById(id) : await Book.find({});
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

module.exports = router;
