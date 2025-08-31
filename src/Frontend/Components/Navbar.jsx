import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { BookReducerContext } from "./LibraryContext";
import { faSun } from "@fortawesome/free-regular-svg-icons";

export default function Navbar({title, logo, pages= [], logoButton}){
    const dispatch = useContext(BookReducerContext)
    const newTheme = {
        navColor: 'bg-base-300',
        themes: 'bg-white text-neutral',
        logo: faSun
    }
    const [change, setChange] = useState(newTheme)
    function handleClickTheme(){
        change ? setChange(null) : setChange(newTheme)
        dispatch({
            type: 'SET_THEME',
            payload : change
        })
    }
    return(
        <nav className={`flex text-white p-4 justify-evenly max-sm:justify-between items-center ${change ? change.navColor : 'bg-neutral'}`}>
            <div className="left flex items-center gap-3">
                <FontAwesomeIcon icon={logo}/>
                <p className="font-bold">{title}</p>
            </div>
            <ul className="right flex items-center gap-6 max-sm:gap-3">
                {pages.map((i, idx) => (
                    <li key={idx}>{i}</li>
                ))}
                <button onClick={handleClickTheme} className="btn btn-ghost hover:bg-transparent rounded-full size-8"><FontAwesomeIcon icon={change ? change.logo : logoButton}/></button>
            </ul>
        </nav>
    )
}