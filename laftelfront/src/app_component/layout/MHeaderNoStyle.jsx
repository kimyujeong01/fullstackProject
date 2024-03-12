
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import { CiSearch } from "react-icons/ci";
import { FaHamburger } from "react-icons/fa";
import React, {useState, useEffect} from 'react';

import Styles from "../../css/styleTest.module.css"
import SideMenu from "./SideMenu";




function MHeaderNoStyle(props) {
  const navigate = useNavigate();

  const SearchClick = () =>{


    navigate('/search');
  }


  return (
      <div >
        <Navbar className={`${Styles.change_header} justify-content-between`}>
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

export default MHeaderNoStyle;