import {useEffect,useState} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from './BackButton.jsx';
import Spinner from './Spinner.jsx';
import {useSnackbar} from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        try {
        const getBook = async () => {
            setLoading(true);
            const response = await axios.get(`https://library-server-2ako2k1d5-justin-zous-projects.vercel.app/books/${id}`);
            setTitle(response.data.data.title);
            setAuthor(response.data.data.author);
            setPublishYear(response.data.data.publishYear);
            setLoading(false);
        }
        getBook();
        } catch(e) {
            setLoading(false);
            enqueueSnackbar('Error',{variant: 'error'});
            console.error(e);
        }  
    },[])

    const putBook = async () => {
        try {
        const data = {
            title: title,
            author: author,
            publishYear: publishYear
        }
        setLoading(true);
        const response = await axios.put(`https://library-server-2ako2k1d5-justin-zous-projects.vercel.app/books/${id}`,data);
        enqueueSnackbar('Book edited successfully', {variant: 'success'});
        setLoading(false);
        navigate('/');
        } catch (e) {
            setLoading(false);
            enqueueSnackbar('Error',{variant: 'error'});
            console.error(e);
        }
    }
  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4 text-center">Edit a Book</h1>
        {loading ? ( <Spinner /> ) : ('')}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">

            <div className="my-4">
                <label  className="text-xl mr-4 text-gray-500">Title</label>
                <input type="text" defaultValue={title} onChange={e=>setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
            </div>

            <div className="my-4">
                <label  className="text-xl mr-4 text-gray-500">Author</label>
                <input type="text" defaultValue={author} onChange={e=>setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
            </div>

            <div className="my-4">
                <label  className="text-xl mr-4 text-gray-500">Year Published</label>
                <input type="text" defaultValue={publishYear} onChange={e=>setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
            </div>

            <button className="p-2 bg-sky-300 m-8" onClick={putBook}>Submit</button>
        </div>
    </div>
  )
}

export default EditBook