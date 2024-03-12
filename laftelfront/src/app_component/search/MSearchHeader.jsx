import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { IoIosArrowBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


function MSearchHeader(props) {
    const { onSearchChange } = props;
    const navigate = useNavigate();
    return (

        <div>
            <Navbar
                className={`justify-content-between`}
                style={{
                    backgroundColor:"white",
                    borderBottom: '1px solid grey',
                    position: 'fixed', // 이 부분이 헤더를 상단에 고정합니다.
                    top: 0,           // 상단에 부착.
                    left: 0,          // 왼쪽에 부착.
                    width: '100%',    // 너비를 100%로 설정하여 화면 전체 너비를 차지하도록 합니다.
                    zIndex: 999       // 다른 요소들 위에 놓이도록 z-index 값을 높게 설정합니다
                }}>



                <div style={{display: 'flex',flexDirection: 'row'}}>
                    <IoIosArrowBack className="icon me-2" size="35px" onClick={()=> navigate(-1)}></IoIosArrowBack>
                    <SearchBar onChange={onSearchChange}/>

                </div>

</Navbar>
</div>
)
    ;
}

export default MSearchHeader;