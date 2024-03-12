import React from "react";
import Header from "../layout/Header";
import KeywordBody from "./KeywordBody";
import Header2 from "../layout/Header2";


function KeywordMain(props) {
    return (
        <div>
            <Header2 />
            <div className={'mt-5'}>
                <KeywordBody/>
            </div>

        </div>
    );
}

export default KeywordMain;