import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { CiCircleRemove } from "react-icons/ci";



function SearchBar(props) {
    const [input, setInput] = useState("");
    const { onChange } = props;
    const handleChange = (value) => {
        setInput(value);
        onChange(value);
    }

    return (
        <div className="input-wrapper">
            <FaSearch  id="search-icon"/>
            <input placeholder='제목,제작사,감독으로 검색(초성)'
                   value={input}
                   onChange={(e) => handleChange(e.target.value)}
            />
            <CiCircleRemove  className="icon me-2" size="25px" onClick={()=>setInput('')}/>


        </div>
    );
}

export default SearchBar;