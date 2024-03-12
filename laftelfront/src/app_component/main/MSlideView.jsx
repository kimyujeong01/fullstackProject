import React, {useState, useRef, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import dotsclass from "../../css/Dots.module.css";
import slide from "../../css/mobile/slide.module.css";
import axios from "axios";
axios.defaults.withCredentials = true;


function MSlideView(props) {
    // 상태를 Hooks를 사용해 관리합니다.
    const [currentSlide, setCurrentSlide] = useState(1);
    // 슬라이더 참조를 useRef를 통해 생성합니다.
    const sliderRef = useRef(null);
    const [imgList, setImgList] = useState([]);


    useEffect(() => {

        axios.get('api/carousels/v1/list/')
            .then(res => {
                const {data} = res;


                setImgList(data);
            })
            .catch(err => {

            });
    }, []);
    // 슬라이드 변경 시 호출되는 함수
    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
    };

    // 이전 슬라이드로 이동하는 함수
    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    // 다음 슬라이드로 이동하는 함수
    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

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



        const sliderContainerStyle = {
            position: 'relative',
            width: '100%',
            maxWidth: 'auto',
            margin: '0 auto',
            overflow: 'hidden',
        };

        const slideImageStyle = {
            height: '850px',
            width: '100%',
            objectFit: 'cover',
        };
    const container = {
        position: 'relative'
    };

    const   overlay = {
        width: '45vw',
        height: '20vh',
        position: 'absolute',
        bottom: '10px',
        /* 예시: 10px */
        left: '10px' /* 예시: 10px */
    };


    return (
        <div style={slide.sliderContainer}>

            <div>
                <Slider
                    {...settings}
                    ref={sliderRef} // useRef를 사용하여 ref를 지정합니다.
                >
                    {
                        imgList.map((item,index) => {

                            return (
                                <div key={index} className={`card border-0`} style={container}>

                                    <img src={item.mobile_img} className="card-img-top" style={{height:'49vh'}} alt="..."/>
                                    <img src={item.logo_img} alt="small" style={overlay}/>
                                </div>
                            )
                        })

                    }

            </Slider>
        </div>
    {/* 버튼 1 (다음) */
    }


</div>

)
    ;
}

export default MSlideView;
