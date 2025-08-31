import { useContext, useState } from "react"
import { BookReducerContext, BooksContext } from "./LibraryContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function BookList(){
    const book = useContext(BooksContext)
    const dispatch = useContext(BookReducerContext)
    const [edit, setEdit] = useState(null);
    const newData = {
        title: '',
        genre: '',
        year: '',
        description: ''
    }
    const [newBook, setNewBook] = useState(newData)
    async function sendDelete(id){
        await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'DELETE'
        })
        dispatch({
            type: 'DELETE_BOOK',
            target: id
        })
    }
    async function sendEdit(id){
        if(newBook.title.trim() === '' || isNaN(newBook.year)|| newBook.year <= 0 || newBook.year > 2025 || newBook.genre.trim()===''){
            dispatch({
                type: 'EDIT_INVALID'
            })
            setEdit(null)
            return
        }
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newBook)
        })
        const data = await response.json()
        if(data.status !== 'success'){
            dispatch({
                type: 'EDIT_INVALID'
            })
            setEdit(null)
            return
        }
        dispatch({
            type: 'EDIT_BOOK',
            payload: data.payload,
            target: id
        })
        setEdit(null)
        setNewBook({title: '', genre: '', year: '', description: ''})
    }
    return(
        <section className={`flex flex-col gap-3 w-full h-screen items-center ${book.length ? '' : 'justify-center'} p-3`}>
            <p className="font-bold text-xl">Books Queue</p>
            {book.length ? (
            <div className={`${book.length ? 'grid' : ''} lg:grid-cols-3 gap-4 sm:grid-cols-2 w-full h-full overflow-y-auto p-4 rounded-sm ${book.length ? '' : 'place-content-center'}`}>
                    {book.map(i => (
                        <div key={i.id} className="flex flex-col gap-2 h-80 justify-between border border-gray-300 p-3 rounded-md">
                            {edit === i.id ? (
                                <input onChange={(e)=>setNewBook({...newBook, title: e.target.value})} defaultValue={i.title} type="text" className="input bg-transparent border border-neutral-600 w-full" placeholder="Masukkan Judul Baru"/>
                            ) : (<span className="font-bold flex items-center gap-2">Judul : <p className="font-normal">{i.title}</p></span>)}
                            {edit === i.id ? (
                                <select name="genre" onChange={(e)=> setNewBook({...newBook, genre: e.target.value})} defaultValue={i.genre} className="select bg-transparent border border-gray-400 w-full">
                                    <option value="" disabled hidden>Pilih Kategori</option>
                                    <option className="text-neutral" value="Romance">Romantis</option>
                                    <option className="text-neutral" value="Horror">Horror</option>
                                    <option className="text-neutral" value="Comedy">Komedi</option>
                                </select>
                            ) : (<span className="font-bold flex items-center gap-2">Genre : <p className="font-normal">{i.genre}</p></span>)}
                            {edit === i.id ? (
                                <input type="number" onChange={(e)=>setNewBook({...newBook, year: Number(e.target.value)})} defaultValue={i.year} className="input bg-transparent border border-neutral-600 w-full" placeholder="Masukkan Tahun Buku"/>
                            ) : (<span className="font-bold flex items-center gap-2">Tahun Terbit : <p className="font-normal">{i.year}</p></span>)}
                            <p className="font-bold">Sinopsis : </p>
                            {edit === i.id ? <textarea className="textarea bg-transparent text-neutral-600 border border-neutral-600 w-full resize-none" onChange={(e)=> setNewBook({...newBook, description:e.target.value})} defaultValue={i.description}></textarea> :  <textarea className="textarea disabled:bg-transparent disabled:text-neutral-600 disabled:border disabled:border-neutral-600 w-full resize-none" disabled value={i.description}></textarea>}
                            <div className="buttons grid grid-cols-2 items-center gap-2">
                                {edit === i.id ? (<button onClick={()=> sendEdit(i.id)} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Simpan</button>) :(<button onClick={()=>setEdit(i.id)} className="btn btn-warning"><FontAwesomeIcon icon={faEdit}/> Edit</button>)}
                                <button onClick={()=> sendDelete(i.id)} className="btn btn-secondary"><FontAwesomeIcon icon={faTrash}/> Hapus</button>
                            </div>
                        </div>
                    ))
                }
                </div>
                ) 
                : (
                    <p className="text-center">Buku Tidak Ditemukan</p>
                )} 
        </section>
    )
}