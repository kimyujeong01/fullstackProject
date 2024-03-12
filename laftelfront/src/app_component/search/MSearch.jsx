import React, {useState} from "react";
import MHeader from "../layout/MHeader";
import MSearchHeader from "./MSearchHeader";
import MSearchBody from "./MSearchBody";


function MSearch(props) {

    const [search, setSearch] = useState("");


    const handleSearchChange = (value) => {
        setSearch(value);
    };

    return (
            <div>
            <MSearchHeader  onSearchChange={handleSearchChange}/>
                <MSearchBody search={search}/>
            </div>
    );
}

export default MSearch;