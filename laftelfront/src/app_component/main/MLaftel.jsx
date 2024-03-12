import React from "react";
import MSlideView from "./MSlideView";
import MHeader from "../layout/MHeader";

import MNewAni from "./MNewAni";
import Footer from "../../component/layout/Footer";
import MRandomTheme from "./MRandomTheme";
import MFooter from "../layout/MFooter";



function MLaftel(props) {
    return (
        <div style={{overflowX:'hidden', overflowY:'auto'}}>
                <MHeader/>

              <MSlideView/>
            <MNewAni/>
            <MRandomTheme/>
            <MRandomTheme/>
            <MRandomTheme/>
            <MRandomTheme/>
            <MRandomTheme/>

            <MFooter/>
        </div>
    );
}

export default MLaftel;