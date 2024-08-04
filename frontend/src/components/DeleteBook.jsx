import {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from './BackButton.jsx';
import Spinner from './Spinner.jsx';
import {useNavigate,useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const DeleteBook = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        const getBook = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://library-server-sable.vercel.app/books/${id}`);

                setTitle(response.data.data.title);
                setAuthor(response.data.data.author);
                setLoading(false);
            } catch(e) {
                setLoading(false);
                enqueueSnackbar('Error',{variant: 'error'});
                console.error(e);
            }
        }
        getBook();
    },[id])

    const deleteBook = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://library-server-sable.vercel.app/books/${id}`);
            enqueueSnackbar('Book deleted successfully', {variant: 'success'});
            setLoading(false);
            navigate('/');
        } catch(e) {
            setLoading(false);
            enqueueSnackbar('Error',{variant: 'error'});
            console.error(e);
        }
    }

  return (
    <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Delete Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2x1">{`Confirm Deletion of "${title}" by ${author}?`}</h3>
            <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={deleteBook}>DELETE</button>
        </div>
    </div>
  )
}

export default DeleteBook