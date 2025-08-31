import { faBook, faFolderPlus, faMoon } from "@fortawesome/free-solid-svg-icons";
import BookForm from "./BookForm";
import BookList from "./BookList";
import Navbar from "./Navbar";
import { useEffect, useReducer, useState } from "react";
import { BookReducerContext, BooksContext } from "./LibraryContext";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LibraryReducer(list, action){
    switch(action.type){
        case "SET_THEME":
            return {...list, theme: action.payload};
        case "ADD_BOOK":
            {const checkData = list.books.some(i => i.title.trim().toLowerCase() === action.payload.title.trim().toLowerCase())
                if(checkData){
                    return {...list, status: 'duplicated'}
                }
                return {...list, books: [...list.books, {...action.payload, id: nanoid(10)}], status: 'success'}
            }
        case "EDIT_BOOK":
            {const checkData = list.books.some(i => i.title.trim().toLowerCase() === action.payload.title.trim().toLowerCase() && i.id !== action.target)
                if(checkData){
                    return {...list, status: 'duplicated'}
                }
                return {...list, books: list.books.map(i => {
                    if(i.id === action.target){
                        return {...action.payload, id: action.target}
                    }
                    return i
                }), status: 'edited'}
            }
        case "DELETE_BOOK" :
            return {...list, books: list.books.filter(i => i.id !== action.target), status: 'deleted'}
        case "ADD_INVALID":
            return {...list, status: 'fail'}
        case "EDIT_INVALID":
            return {...list, status: 'edit_fail'}
        case "RESET_STATUS":
            return {...list, status: ''}
    }
}

export default function BookManager(){
    const [Library, dispatch] = useReducer(LibraryReducer, {
        books: [],
        keyword: '',
        theme: null,
        status: ''
    })
    const [trigger, setTrigger] = useState(false)
    const [message, setMessage] = useState(null);
    function setAlert(text){
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 1400);
    }
    useEffect(()=> {
        if(Library.status.trim() === 'success'){
            setAlert({info: 'Berhasil Menambahkan' ,type: 'success'})
        }
        else if(Library.status.trim() === 'duplicated'){
            setAlert({info: 'Duplikasi Data' ,type: 'error'})
        }
        else if(Library.status.trim() === 'fail'){
            setAlert({info: 'Gagal Menambahkan, Data tidak Valid' ,type: 'error'})
        }
        else if(Library.status.trim() === 'deleted'){
            setAlert({info: 'Berhasil Menghapus' ,type: 'success'})
        }
        else if(Library.status.trim() === 'edited'){
            setAlert({info: 'Berhasil Memperbarui' ,type: 'success'})
        }
        else if(Library.status.trim() === 'edit_fail'){
            setAlert({info: 'Gagal Memperbarui' ,type: 'error'})
        }
        if(Library.status){
            dispatch({
                type: 'RESET_STATUS'
            })
        }
    }, [Library.status])
    // console.log('cek parent: ', trigger)
    function handleSendClose(value){
        setTrigger(Boolean(value))
    }
    return(
        <main className={`flex flex-col min-h-screen ${Library.theme ? Library.theme.themes : 'bg-base-200 text-white'}`}>
            <BooksContext.Provider value={Library.books}>
                <BookReducerContext.Provider value={dispatch}>
                    <Navbar title={"MiniLibrary"} logo={faBook} pages={["Home", "Favourite"]} logoButton={faMoon}/>
                    {message ? (
                        <div className={`flex fixed place-self-end m-4 inset-0 alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                            <p className="text-white">{message.info}</p>
                        </div>
                    ) : ''}
                    <div className="content p-4">
                    <div className="modalForm">
                        <BookForm visibility={trigger} sendClose={handleSendClose}/>
                    </div>
                    <div className={`Booklist flex flex-col gap-3 min-h-screen p-3`}>
                        <button onClick={()=> setTrigger(true)} className={`btn w-fit self-end ${Library.books.length > 0 ? '' : 'hidden'} btn-primary`}><FontAwesomeIcon icon={faFolderPlus}/> Tambah Buku</button>
                        <div className="collection flex flex-col">
                            <BookList/>
                            <button onClick={()=> setTrigger(true)} className={`btn w-fit self-end ${Library.books.length > 0 ? 'hidden' : ''} btn-primary`}><FontAwesomeIcon icon={faFolderPlus}/> Tambah Buku Sekarang!</button>
                        </div>
                    </div>
                    </div>
                </BookReducerContext.Provider>
            </BooksContext.Provider>
        </main>
    )
}