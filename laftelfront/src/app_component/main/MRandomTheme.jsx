import React, { useEffect, useState } from "react";
import axios from "axios";
import arrowStyle from "../../css/Arrow.module.css";
import text  from "../../css/mobile/text.module.css";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import '../../css/mobile/slideImage.css'

function MRandomTheme(props) {
    const [title, setTitle] = useState('');
    const [list, setList] = useState([]);
    var settings = {
        infinite: true,
        speed: 100,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0
    };

    useEffect(() => {
        const number = Math.floor(Math.random() * 170) + 1;
        axios.get(`/api/recommends/v2/themes/${number}/`)
            .then(res => {
                const { data } = res;
                setTitle(data.title);
                const theme_item_list = data.theme_item_list.map(item => ({
                    ...item,
                    image_url: item.item.images[0]?.img_url // images 배열의 첫 번째 원소의 img_url을 가져옴 (optional chaining을 사용)
                }));
                setList(theme_item_list);

            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 style={{textAlign: 'left', marginLeft: '5px'}}>{title}</h2>

            {
                list.length === 0 ? (
                    // Slider가 아닌 단일 이미지 컴포넌트 렌더링
                    <div className="card p-2 border-0">
                        <img
                            src="/image/background.png"
                            className="card-img-top"
                            alt="대체 텍스트"
                            style={{width: '100%', height: '20vh'}}
                        />
                    </div>
                ) : (
                    // list 배열에 항목이 있을 때 Slider 컴포넌트 렌더링
                    <Slider {...settings}>
                        {
                            list.map((item, index) => (
                                <div key={index}>
                                    <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.item.id}}>
                                        <div className="card p-2 border-0">
                                            <img
                                                src={item.image_url}
                                                className="card-img-top"
                                                alt={item.item.name}
                                                style={{width: '100%', height: '20vh'}}
                                            />
                                            <h5 className={`card-title ${text.multiLineEllipsis}`}>{item.item.name}</h5>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </Slider>
                )
            }
        </div>
    );
}

export default MRandomTheme;