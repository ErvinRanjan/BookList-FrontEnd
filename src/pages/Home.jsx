import  {useState} from "react"
import { useEffect } from "react"
//for http req
import axios from "axios"
import Spinner from "../components/Spinner"
//importing some icons
import {AiOutlineEdit} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs"
import {MdOutlineAddBox,MdOutlineDelete} from "react-icons/md"
//to add link to other routes
import {Link} from "react-router-dom"
import EditBook from "../components/EditBook.jsx"
import AddBook from "../components/AddBook.jsx"

export default function Home(){
    const [books,setBooks] = useState([])
    const [loading,setloading] = useState(false)
    const [add,setAdd] = useState(false)
    const [edit,setEdit] = useState(false)
    const [sendBook,setSendBook] = useState({})

    useEffect(()=>{
        setloading(true)
        axios.get("http://localhost:5555/books")
            .then((res)=>{
                setBooks(res.data.data)
                setloading(false)
            })
            .catch((error)=>{
                console.log(error.message)
                setloading(false)
            })
    },[])
    function addBook(){
        const mb = document.getElementById("main-body")
        if(add==true){
            setAdd(false)
            mb.style.backgroundColor = "transparent"
            mb.style.opacity = "100%"
        }
        else{
            setAdd(true)
            mb.style.backgroundColor = "gray"
            mb.style.opacity = "50%"
        }
    }
    function editBook(){
        const mb = document.getElementById("main-body")
        if(edit==true){
            setEdit(false)
            mb.style.backgroundColor = "transparent"
            mb.style.opacity = "100%"
        }
        else{
            setEdit(true)
            mb.style.backgroundColor = "gray"
            mb.style.opacity = "50%"
        }
    }
    return (
        <>
        {(loading)?(
            <Spinner></Spinner>
        ):(
            <>
            {
                (add && <AddBook addBook = {addBook}></AddBook>)
            }
            {
                (edit && <EditBook editBook = {editBook} sendBook = {sendBook}></EditBook>)
            }
            <div id="main-body">
           <h1 className="text-2xl underline underline-offset-4">Book List</h1>
           <div className="flex justify-end" onClick={addBook}>
           <MdOutlineAddBox className="text-blue-700 enlarge-on-hover-2 my-2 text-xl"></MdOutlineAddBox>
            </div>  
           <div className="flex justify-between text-center min-h-250">
           <div className="flex flex-col flex-grow mx-1 gap-2">
            <div className="outline rounded-md enlarge-on-hover-1">No</div>
            {books.map((book,index)=>{
                return <div className="outline rounded-md enlarge-on-hover-1" key={book._id}>
                    {index+1}
                </div>
            })}
           </div>
           <div className="flex flex-col flex-grow mx-1 gap-2">
            <div className="outline rounded-md enlarge-on-hover-1">Title</div>
            {books.map((book,index)=>{
                return <div className="outline rounded-md enlarge-on-hover-1" key={book._id}>
                    {book.title}
                </div>
            })}
           </div>
           <div className="flex flex-col flex-grow mx-1 gap-2">
            <div className="outline rounded-md enlarge-on-hover-1">Author</div>
            {books.map((book)=>{
                return <div className="outline rounded-md enlarge-on-hover-1" key={book._id}>
                    {book.author}
                </div>
            })}
           </div>
           <div className="flex flex-col flex-grow mx-1 gap-2">
            <div className="outline rounded-md enlarge-on-hover-1">PublishYear</div>
            {books.map((book)=>{
                return <div className="outline rounded-md enlarge-on-hover-1" key={book._id}>
                    {book.publishYear}
                </div>
            })}
           </div>
           <div className="flex flex-col flex-grow mx-1 gap-2">
            <div className="outline rounded-md enlarge-on-hover-1">Operations</div>
            {books.map((book)=>{
                return <div className="outline rounded-md enlarge-on-hover-1" key={book._id}>
                    {/* <Link to={`/books/${book._id}`}> */}
                    <AiOutlineEdit className="inline-block mx-1 text-yellow-700 enlarge-on-hover-2" onClick={()=>{
                        editBook()
                        setSendBook(book)
                    }}></AiOutlineEdit>
                    {/* </Link> */}
                    <Link to={`/books/${book._id}`}>
                    <BsInfoCircle className="inline-block mx-1 text-green-700 enlarge-on-hover-2"></BsInfoCircle>
                    </Link>
                    {/* <Link to={`/books/${book._id}`}> */}
                    <MdOutlineDelete className="inline-block mx-1 text-red-700 enlarge-on-hover-2" onClick={(e)=>{
                        axios.delete(`http://localhost:5555/books/${book._id}`)
                        .then(()=>console.log(`deleted ${book._id}`))
                        .catch(err=>console.log(err.message))
                        e.preventDefault();
                        window.location.reload();
                    }}></MdOutlineDelete>
                    {/* </Link> */}
                </div>
            })}
           </div>
           </div>
           </div>
           </>
        )}
        </>
        
    )
}