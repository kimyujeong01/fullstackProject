import React, {useEffect, useState} from "react";
import arrowStyle from "../css/Arrow.module.css";
import axios from "axios";
import Slider from "react-slick";


function MobileTodoApp(props) {
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        // axios 요청을 프록시를 사용하도록 상대 경로로 변경
        axios.get('/api/search/v2/daily/')
            .then(res => {
                const { data } = res;
                console.log(data);
                setAnimeList(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className={"p-5 container"}>
            {
                // map 메서드를 사용하여 배열의 각 항목을 순회하고,
                // 각 항목에 대한 JSX를 반환합니다. 반환할 때 반드시 고유한 key를 제공해야 합니다.
                animeList.map((item, index) => (
                    // 반복되는 요소에는 고유한 key가 필요합니다. 여기서는 index를 사용하였습니다.
                    <div key={index}>
                        <h5 className="card-title text-truncate">{item.name}</h5>
                    </div>
                ))
            }
        </div>
    );
}

export default MobileTodoApp;