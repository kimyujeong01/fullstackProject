import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

function DetailTest(props) {
    const location = useLocation();
    const itemId = location.state?.item;
    const [animeDetail, setAnimeDetail] = useState([]);



    useEffect(() => {
        let now = new Date();
        axios.get(`/api/v1.0/items/${itemId}/detail/`)
            .then(res => {
                const {data} = res;
                setAnimeDetail(data);

                const imageUrl = data.img;
                console.log(imageUrl);



            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <img src={``} className={"img-fluid"} style={{width:"100%",height:"400px"}}/>
            <p>{animeDetail.id}</p>
        </div>
    );
}

export default DetailTest;