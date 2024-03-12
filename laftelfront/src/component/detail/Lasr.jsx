import React, {useEffect, useState} from "react";
import axios from "axios";

function Lasr(props) {
    const itemId = props.itemId;
    const [length, setLength] =useState(0);

    const [avg, setAvg] = useState(0);
    useEffect(()=>{
        const postData = {
            aniIdx: itemId
        };


        axios.post(`/aniDetail/comment` ,postData)
            .then(res => {

                const count =  res.data.map(comment => comment.score);
                const total = res.data.reduce((acc, comment) => acc + comment.score, 0);
                setLength(count.length);
                console.log(total);
                console.log(count.length);
                setAvg(total/count.length);


            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);

    return (
        <div>
            <h2 className={"mt-2"}>{avg ? avg : 0}</h2>
            <span>라프텔피디아 평균 별점</span>

        </div>
    );
}

export default Lasr;