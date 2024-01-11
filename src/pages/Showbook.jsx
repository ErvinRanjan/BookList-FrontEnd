import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom'


export default function ShowBook(){
    const [book,setBook] = useState({})
    const [loading,setloading] = useState(false)
    const {id} = useParams();

    useEffect(()=>{ 
        setloading(true)
        axios.get(`http://localhost:5555/books/${id}`)
            .then((res)=>{
                setBook(res.data)
                setloading(false)
            })
            .catch((error)=>{
                console.log(error.message)
                setloading(false)
            })
    },[])

    return (
        <>
        {
        (loading)?
        (
            <Spinner></Spinner>
        ):(
        <>
        <Link to="/">
        <button className='outline p-1 text-xl enlarge-on-hover-1 m-1 rounded-md'>&larr;
        </button>
        </Link>
        <div className='min-h-screen grid place-content-center'>
        <div className='grid grid-cols-2 text-center text-xl outline rounded-md p-2'>
            <div className='grid col-span-2 place-content-center my-4'>
               { (book.imageUrl=="NULL")?
               (
               <img src="../../images/download.png" className="rounded-md"></img>
               ):
               (
                <img src={book.imageUrl} className="rounded-md"></img>
               )
                }
                
            </div>
            <div>Title:</div>
            <div>{book.title}</div>
            <div>Author:</div>
            <div>{book.author}</div>
            <div>PublishYear:</div>
            <div>{book.publishYear}</div>
        </div>
        </div>
        </>
        )
        }
        </>
    )
}