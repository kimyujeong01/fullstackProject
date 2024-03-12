import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import arrowStyle from "../../css/Arrow.module.css";
import {ReactComponent as NavArrowLeftIcon} from "../../css/assets/svg/leftArrow.svg";
import {ReactComponent as NavArrowRightIcon} from "../../css/assets/svg/rightArrow.svg";
import {Link} from "react-router-dom";
import SlideView from "./SlideView";
import GenreAni from "./GenreAni";
import NoLoginTheme from "./NoLoginTheme";
axios.defaults.withCredentials = true;

function NextArrow(props) {


    const {isHovered, setIsHovered, className, style, onClick, setShowPrevButton } = props;

    const handleClick = () => {
        onClick();
        setShowPrevButton(true);


    };

    return (
        <div
            className={isHovered ? arrowStyle.arrow : ''}
            style={{fontSize:'0px'}}
            onMouseEnter={() => arrowStyle.arrow }
            onClick={handleClick}>
            {isHovered && <NavArrowRightIcon />}
        ></div>
    );
}

function PrevArrow(props) {
    const {isHovered, style, onClick, showPrevButton } = props;
    const handleClick = () => {
        onClick();
    };

    return (
        <div
            className={isHovered ? arrowStyle.arrowLe : ''}
            style={{ ...style, display: showPrevButton ? "" : "none", fontSize:'0px' }}
            onMouseEnter={() => arrowStyle.arrow }
            onClick={handleClick}>
            {isHovered && <NavArrowLeftIcon />}
        > </div>
    );
}



function NewAni(props) {
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const [isHovered, setIsHovered] = useState(false);
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [animeList, setAnimeList] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState();

    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    var settings = {
        infinite: true,
        speed: 100,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <PrevArrow showPrevButton={showPrevButton} isHovered={isHovered} className={arrowStyle.arrow} setIsHovered={setIsHovered}/>,
        nextArrow: <NextArrow showPrevButton={showPrevButton} isHovered={isHovered} className={arrowStyle.arrow} setShowPrevButton={setShowPrevButton} />,
        initialSlide: 0
    };

    useEffect(() => {
        let now = new Date();
        setDayOfWeek(week[now.getDay()]);
        axios.get('api/search/v2/daily/')
            .then(res => {
                const {data} = res;

                setAnimeList(data);

            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // const ClickButton = (props) =>{
    //    alert(props);
    // }



    return (

        <div>
            <SlideView/>


            <div className={"container mt-5"}>
                <p className={"fw-bold fs-4"}>요일별 신작</p>
                <div className="d-grid gap-2 d-md-block">
                    {
                        week.map(item => {
                            return (
                                <button className="btn rounded-circle me-3 fw-bold"
                                        style={{backgroundColor: item === dayOfWeek ? "purple" : "gray", color: "white"}}
                                        type="button" onClick={(e) => {
                                    setDayOfWeek(item)
                                }}>{item.substring(0, 1)}</button>
                            )
                        })
                    }
                </div>


                <div className={"row mt-2"}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                    <Slider {...settings}>
                        {
                            animeList.map(item => {
                                if (item.distributed_air_time === dayOfWeek) {
                                    return (
                                        <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.id}}>
                                            <div className="card p-2 border-0">
                                                <img src={item.img} style={{height: "40vh", objectFit: "cover"}}
                                                     className="card-img-top" alt="..."/>
                                                <h5 className="card-title text-truncate">{item.name}</h5>
                                            </div>
                                        </Link>

                                    )
                                }
                            })
                        }
                    </Slider>
                </div>
            </div>

            <GenreAni/>

            {
                username
                    ? null
                    : (
                        <>
                            <NoLoginTheme/>
                            <NoLoginTheme/>
                            <NoLoginTheme/>
                            <NoLoginTheme/>
                            <NoLoginTheme/>
                        </>
                    )
            }
        </div>
    );
}

export default NewAni;