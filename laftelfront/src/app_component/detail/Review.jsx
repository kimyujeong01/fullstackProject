import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Asr from "../../component/detail/Asr";


import MbComment from "./MbComment";

import Lasr from "../../component/detail/Lasr";


function Review(props) {
    const location = useLocation();
    const itemId = location.state?.item;
    const [animeReview, setAnimeReview] = useState([]);
    const [comm, setComm] = useState([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        let now = new Date();


        axios.get(`/api/v1.0/items/${itemId}/detail/`)
            .then(res => {

                const {data} = res;
                const {meta_info} = res.data;

                setAnimeReview(meta_info);
                setComm(data);

            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);


    return (
        <div>

            <div className={"position-absolute text-white fw-bold bg-dark bg-opacity-25"}
                 style={{bottom: "5px", left: "360px"}}>
            </div>

            <div className={"row"}>

                <div className={'container d-flex justify-content-center text-center'}>
                    <div className={"col"}>
                        <Asr itemId={comm.id}/>
                    </div>

                    <div className={"col"}>
                        <Lasr itemId={comm.id}/>

                    </div>
                </div>

                <div className={"container"}>
                    <div style={{marginTop: "40px"}}>
                        <MbComment itemId={comm.id}/>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Review;