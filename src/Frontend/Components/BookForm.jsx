import { useContext, useState } from "react"
import { BookReducerContext } from "./LibraryContext"

export default function BookForm({visibility, sendClose}){
    const dispatch = useContext(BookReducerContext)
    const newData = {
        title: '',
        genre: '',
        year: '',
        description: ''
    }
    const [Book, setBook] = useState(newData)
    // const [visible, setVisible] = useState(visibility)
    // console.log('cek child: ', visibility)
    function handleSend(e){
        e.preventDefault();
        if(Book.title.trim() === '' || Book.genre.trim() === '' || isNaN(Book.year) || Number(Book.year) <= 0 || Number(Book.year) > 2025){
            dispatch({
                type: 'ADD_INVALID',
            })
            handleClose()
            return
        }
        dispatch({
            type: 'ADD_BOOK',
            payload: Book
        })
        handleClose()
        setBook({title: '', year: '', genre: '', description: ''})
    }
    function handleClose(){
        visibility === true ? sendClose(false) : ''
    }
    return(
        <section className={`fixed ${visibility === true ? '' : 'hidden'} inset-0 place-content-center bg-black/30 border border-neutral`}>
            <form action="" onSubmit={handleSend} className="flex flex-col bg-white rounded-sm p-4 w-[80%] lg:w-[30%] place-self-center justify-center items-center gap-3 text-neutral">
                <p className="font-bold text-xl">Tambah Buku</p>
                <div className="content flex flex-col gap-1 w-full">
                    <label htmlFor="title" className="text-sm">Judul Buku: </label>
                    <input name="title" value={Book.title} onChange={(e)=> setBook({...Book, title: e.target.value})} type="text" className="input bg-transparent border border-gray-400 w-full" placeholder="Masukkan Judul Buku"/>
                    <label htmlFor="genre" className="text-sm">Genre : </label>
                    <select name="genre" onChange={(e)=> setBook({...Book, genre: e.target.value})} value={Book.genre} className="select bg-transparent border border-gray-400 w-full">
                        <option value="" disabled hidden>Pilih Kategori</option>
                        <option value="Romance">Romantis</option>
                        <option value="Horror">Horror</option>
                        <option value="Comedy">Komedi</option>
                    </select>
                    <label htmlFor="year" className="text-sm">Tahun Buku: </label>
                    <input name="year" value={Book.year} onChange={(e)=> setBook({...Book, year: Number(e.target.value)})} type="text" className="input bg-transparent border border-gray-400 w-full" placeholder="Masukkan Tahun Terbit Buku"/>
                    <label htmlFor="description" className="text-sm">Sinopsis: </label>
                    <textarea name="description" value={Book.description} onChange={(e)=> setBook({...Book, description: e.target.value})} type="text" className="textarea resize-none bg-transparent border border-gray-400 w-full" placeholder="Sinopsis Singkat Buku"/>
                </div>
                <button className="btn btn-success text-white w-full">Tambah Buku!</button>
            </form>
        </section>
    )
}