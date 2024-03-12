
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import { CiSearch } from "react-icons/ci";


import React, {useState, useEffect} from 'react';

import Styles from "../../css/styleTest.module.css"
import SideMenu from "./SideMenu";




function MHeader(props) {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    const SearchClick = () =>{


        navigate('/search');
    }

    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    });

    return (
        <div >
            <Navbar className={`${scrollPosition < 60 ? Styles.HeaderContainer : Styles.change_header} justify-content-between`}>
                <Navbar.Brand  href="/" style={{
                    color: "purple",
                    fontSize: "32px",
                    fontStyle: "initial"
                }}>LAFTELPEDIA</Navbar.Brand>

                <div style={{}}>
                    <CiSearch className="icon me-2" size="35px" onClick={SearchClick}></CiSearch>
                    <SideMenu/>

                </div>
            </Navbar>
        </div>
    );
}

export default MHeader;