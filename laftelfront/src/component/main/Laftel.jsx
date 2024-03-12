import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../layout/Header";
import NewAni from "./NewAni";
import Footer from "../layout/Footer";

import SlideView from "./SlideView";
import SlowImageAnimation from "../../test/SideImageAnimation";
import GenreAni from "./GenreAni";
import AdPopup from "../popup/AdPopup";
import NoLoginTheme from "./NoLoginTheme";



function Laftel(props) {
    return (
    <div>
        <Header/>

        <Outlet/>

        <AdPopup/>


        <Footer/>


    </div>
    );
}

export default Laftel;