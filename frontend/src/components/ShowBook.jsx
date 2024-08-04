import {useEffect,useState} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from './BackButton.jsx';
import Spinner from './Spinner.jsx';

const ShowBook = () => {
    const [book,setBook] = useState({});
    const [loading,setLoading] = useState(false);
    const {id} = useParams();
    useEffect(()=>{

        async function fetchBook() {
            try {
            setLoading(true);
            const response = await axios.get(`https://library-server-4mt9dhqmn-justin-zous-projects.vercel.app/books/${id}`)
            setBook(response.data.data);
            setLoading(false);
            } catch(e) {
                setLoading(false);
                console.error(e);
            }
        }
        fetchBook();
    },[])
  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Show Book</h1>
        {loading ? (
            <Spinner></Spinner>
        ) : (
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 m-auto">
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Id</span>
                    <span>{book._id}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Title</span>
                    <span>{book.title}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Author</span>
                    <span>{book.author}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Year Published</span>
                    <span>{book.publishYear}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Create Time</span>
                    <span>{new Date(book.createdAt).toString()}</span>
                </div>
                <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
                    <span>{new Date(book.updatedAt).toString()}</span>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default ShowBook