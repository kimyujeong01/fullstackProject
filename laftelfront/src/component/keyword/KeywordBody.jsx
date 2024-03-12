import {Link, useSearchParams} from 'react-router-dom';

import React, {useEffect, useState} from "react";
import gridImg from "../../css/gridImage.module.css"
import axios from "axios";

function KeywordBody(props) {
    const [searchItem, setSearchItem] = useState([]);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [count, setCount] = useState(0); // count 상태를 useState를 이용해 관리합니다.
    let cnt = 0;


    useEffect(() => {
        axios.get(`api/search/v3/keyword/?keyword=${keyword}&viewing_only=true&offset=${count}&size=24`)
            .then(res => {
                cnt++;
                const newItems = res.data.results;
                console.log(newItems);
                if (cnt === 1){
                    setSearchItem(prevItems => [...prevItems, ...newItems]);
                }
            })
            .catch(err => {
                console.log(err);
            });

        window.addEventListener('scroll', handleScroll);
        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, [keyword, count]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setCount(prevCount => prevCount + 24); // count를 24만큼 증가시킵니다.
    };


    return (
        <div className={'p-5'}>
            <h1>'{keyword}' <span className={"text-secondary"}>검색 결과</span></h1>
            <div className={gridImg.container}>
                <div className="row">
                    {searchItem.map((item, index) => {
                        const imageUrl = item.images.length > 1 ? item.images[1].img_url : item.images[0].img_url; // images[1]이 있으면 그것을 사용하고, 없으면 images[0]을 사용
                        return (
                            <Link to={`/Detail`} state={{item: item.id}} key={index} className="col-md-2 pb-3 text-black text-decoration-none">
                                <div >
                                    <img src={imageUrl} alt={item.name} className={gridImg.keyImg}/>
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>

    );
}

export default KeywordBody;