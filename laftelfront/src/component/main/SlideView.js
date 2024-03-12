import React, {useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dotsclass from "../../css/Dots.module.css";
import slide from "../../css/mobile/slide.module.css";

import axios from "axios";
axios.defaults.withCredentials = true;



function SlideView(props) {
    // 상태를 Hooks를 사용해 관리합니다.
    const [currentSlide, setCurrentSlide] = useState(1);
    // 슬라이더 참조를 useRef를 통해 생성합니다.
    const sliderRef = useRef(null);
    const [imgList, setImgList] = useState([]);


    useEffect(() => {

        axios.get('api/carousels/v1/list/')
            .then(res => {
                const {data} = res;
                console.log(data);

                setImgList(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    // 슬라이드 변경 시 호출되는 함수
    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
    };

    // 이전 슬라이드로 이동하는 함수


    // 슬라이더 설정은 동일하게 유지합니다.
    const settings = {
        dots:true,
        appendDots: (dots) => (
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "right"}}
            >
                <ul> {dots} </ul>
            </div>
        ),
        dotsClass: dotsclass.dots_custom,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '0px',
        autoplay: true,
        autoplaySpeed: 5000,
        draggable: true,
        fade: false,
        arrows: true, // Disable default arrows since custom buttons are added
        vertical: false,
        initialSlide: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        afterChange: handleSlideChange
    };




    const   overlay = {
        position: 'absolute',
        top: '10px',
        /* 예시: 10px */
        left: '10px' /* 예시: 10px */
    };
    // CSS 스타일 객체 생성


    return (
        <div style={{overflow: "hidden"}}>

            <div>
                <Slider
                    {...settings}
                    ref={sliderRef} // useRef를 사용하여 ref를 지정합니다.
                >
                    {
                        imgList.map(item => {

                            return (
                                <div className="card">


                                    <img src={item.web_img} className="card-img-top" style={{objectFit:"cover", borderRadius:'0px'}} alt="..."/>
                                    <img src={item.logo_img} alt="small" style={overlay}/>
                                </div>
                            )
                        })

                    }

                </Slider>
            </div>

        </div>

    )
        ;
}

export default SlideView;
