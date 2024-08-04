import {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from './Spinner.jsx';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md';
import BooksTable from './BooksTable.jsx';
import BooksCard from './BooksCard.jsx';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [isTable, setIsTable] = useState(true);
    useEffect(()=>{
    async function fetchBooks() {
        try {
        setLoading(true);
        const response = await axios.get('https://library-server-4mt9dhqmn-justin-zous-projects.vercel.app/books');
        console.log(response);
        setBooks(response.data.data);
        setLoading(false);
        } catch(e) {
            console.error(e);
            setLoading(false);
        }
    }
    fetchBooks();
    },[])

    useEffect(()=>{
        const test = books.map((book,index)=> {
           return <p>Hi</p>
        })
        console.log(test);
    },[books])
  return (
    <div className="p-4">

        <div className="flex justify-center items-center gap-x-4">
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={()=>setIsTable(true)}>Table</button>
            <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={()=>setIsTable(false)}>Card</button>
        </div>

        <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8"> Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl' />
            </Link>
        </div>

        {loading ? <Spinner /> :(isTable ? <BooksTable books={books}/> : <BooksCard books={books} />)
        }
    </div>
  )
}

export default Home