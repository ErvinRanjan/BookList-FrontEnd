import axios from "axios";
export default function AddBook({addBook}){
    function handleAdd(e){
        const inp = {
            title: e.target[0].value,
            author: e.target[1].value,
            publishYear: e.target[2].value
        }
        axios.
        post("http://localhost:5555/books",inp)
        .then(()=>{
            console.log(inp)
        })
        .catch((err)=>{
            console.log(err.message);
        })
    }
    return (
        <div className="absolute grid place-content-center min-h-screen min-w-full">
            <div className="z-10 outline p-2 bg-white flex flex-col rounded-sm">
            <div className="flex justify-end">
                    <button type="button" className="outline rounded-sm p-1 enlarge-on-hover-1 bg-black text-white" onClick={()=>{
                        addBook();
                    }}>X</button>
                    </div>
                <form onSubmit={handleAdd}>
                    <label htmlFor="title">Title
                    </label>
                    <div className="flex outline rounded-sm p-1 m-1 enlarge-on-hover-1">
                    <input type="text" id="title" placeholder="Harry Potter" className="focus:outline-none"></input>
                    </div>
                    <label htmlFor="author">
                    Author
                    </label>
                    <div className="flex outline rounded-sm p-1 m-1 enlarge-on-hover-1">
                    <input type="text" id="author" placeholder="J.K.Rowling" className="focus:outline-none"></input>
                    </div>
                    <label htmlFor="publishYear">
                    PublishYear
                    </label>
                    <div className="flex outline rounded-sm p-1 m-1 enlarge-on-hover-1">
                    <input type="text" id="publishYear" placeholder="1997" className="focus:outline-none"></input>
                    </div>
                    <button type="submit" className="bg-black my-2 text-center w-full rounded-sm enlarge-on-hover-1 text-white" onSubmit={(e)=>{
                    e.preventDefault();
                    addBook();
                    }}>Submit</button>
                </form>
            </div>
        </div>
    )
} 