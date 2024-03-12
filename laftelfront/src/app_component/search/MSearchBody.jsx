import React, {useEffect, useState} from "react";
import axios from "axios";
import gridImg from "../../css/gridImage.module.css";
import {Link} from "react-router-dom";


function MSearchBody(props) {
  const {search} = props;
    const [searchItem, setSearchItem] = useState([]);
    const [offset, setOffset] = useState(0);

    const gridStyle = {
        paddingTop:'70px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 이 부분이 2열로 표시하기 위한 설정입니다.
        gap: '10px', // 각 항목 사이의 간격을 설정합니다.

    };


    useEffect(() => {
        axios.get(`api/search/v3/keyword/?keyword=${search}&viewing_only=true&offset=${offset}&size=24`)
            .then(res => {
                const newItems = res.data.results;
                console.log(newItems);
                setSearchItem(prevItems => [...prevItems, ...newItems]);
            })
            .catch(err => {
                console.log(err);
            });




        window.addEventListener('scroll', handleScroll);
        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    },[search,offset]);

    useEffect(() => {
        setSearchItem([]);
        setOffset(0);
    }, [search]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setOffset(prevState => prevState + 24); // count를 24만큼 증가시킵니다.
    };



    return (

        <div style={gridStyle} className={"container"}>
            {searchItem.map((item, index) => {
                const imageUrl = item.images.length > 1 ? item.images[1].img_url : item.images[0].img_url;
                return (
                    <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.id}}>
                    <div key={index}>
                        <img src={imageUrl} alt={item.name} style={{width: '100%', height:'12vh', objectFit: "cover"}}/>
                        <p style={{color:'black'}} >{item.name}</p>
                    </div>
                    </Link>
                );
            })}
        </div>


    );
}

export default MSearchBody;