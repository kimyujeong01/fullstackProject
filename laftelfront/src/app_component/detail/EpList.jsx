import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoXCircle } from "react-icons/go";

import MOther from "./MOther";
import ContentModal from "./ContentModal";
import {useLocation, useNavigate} from "react-router-dom";


function EpisodesList() {
    const navigate = useNavigate();
    const [animeDetail, setAnimeDetail] = useState([]);
    const [animeImg, setAnimeImg] = useState();
    const [animeTag, setAnimeTag] = useState([]);
    const [animeInto, setAnimeInto] = useState();
    const [simAni, setSimAni] = useState([]);
    const [isPenActive, setIsPenActive] = useState(false);


    const location = useLocation();
    const itemId = location.state?.item;
    const data = sessionStorage?.getItem('userId');
    const username = JSON.parse(data);
    let userInfo = {userId: username, aniIdx: itemId, aniTitle: "", aniImgUrl: ""};

    const [isPulsActive, setIsPulsActive] = useState(false);


    const [isEyeActive, setIsEyeActive] = useState(false);

    const [itemData, setItemData] = useState({
        name: "",
        img: "",
        content: "",
        content_rating: "",
        air_year_quarter: "",
        tags: [],
    });

    const maxLines = 10;
    const ellipsisStyle = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical"
    };

    const [penOnOff , setPenOnOff] = useState(false);
    const [content, setContent] = useState([]);



    const pulsButton = (e) => {
        if (username === null){
            alert("로그인 후 이용해 주세요");
        }else {
            axios.post('/aniDetail/wishCheck',userInfo)
                .then(res => {

                    setIsPulsActive(res.data.result);
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }

    const eyeButton = (e) => {
        if (username === null) {
            alert("로그인 후 이용해 주세요");
        } else {
            axios.post('/aniDetail/viewingCheck', userInfo)
                .then(res => {

                    setIsEyeActive(res.data.result);
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }

    const penButton = (e) => {
        if (username === null) {
            alert("로그인 후 이용해 주세요");
        } else {
            if (isPenActive == true) {
                alert("수정과 삭제는 마이페이지로 이동해주세요.");
                navigate("/"); // 마이페이지로 이동하도록 수정
            } else {
                setPenOnOff(true);
            }
        }
    }

    const exitIcon =()=>{
        navigate(-1);
    }


    useEffect(() => {
        // 작품 상세 정보
        axios.get(`/api/v1.0/items/${itemId}/detail/`)
            .then(res => {
                const data = res.data;

                if (data) {
                    const {name, img, content, content_rating, main_tag, animation_info} = data;

                    setItemData({
                        name,
                        img,
                        content,
                        content_rating,
                        air_year_quarter: animation_info.air_year_quarter,
                        tags: main_tag.map(tag => tag.name)
                    });
                } else {
                    console.log('데이터가 없습니다.');
                }
            })
            .catch(err => {
                console.log('에러 발생:', err);
            });

        axios.post('/aniDetail/wish', userInfo)
            .then(res => {

                setIsPulsActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })

        axios.post('/aniDetail/viewing', userInfo)
            .then(res => {

                setIsEyeActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })

        axios.post('/aniDetail/review', userInfo)
            .then(res => {

                setIsPenActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })


    }, [itemId]);



    userInfo = {userId: username, aniIdx: itemId, aniTitle: itemData.name, aniImgUrl: itemData.img};


    return (
        <div>
            {/* 창닫기 부분 둥근테두리 */}
            <div>
                <div style={{
                    padding: "20px",
                    borderRadius: "15px",
                    width: "100%",
                    position: "relative",
                    backgroundColor: "white",
                    textAlign: "center",
                }}>
                    {/* 창닫기 버튼*/}
                    <div>
                        <button
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: "5px",
                                right: "1px",
                                backgroundColor: "white",
                                border: "none"
                            }}>
                            <GoXCircle onClick={exitIcon} style={{marginRight: '5px', verticalAlign: 'middle', fontSize: '25px'}}/>
                        </button>
                        <img src={itemData.img} alt="이미지" style={{width: '230px', height: '250px'}}/>
                        <h5 style={{fontWeight: 'bold', marginTop: '15px'}}>{itemData.name}</h5>
                        <div style={{textAlign: "left"}}>
                            <p style={{fontSize: "15px", lineHeight: "1.5", ...ellipsisStyle}}>{itemData.content}</p>
                            {itemData.tags && itemData.tags.length > 0 && (
                                <p style={{fontSize: "14px"}}>
                                    {itemData.tags.map((tag, index) => (
                                        <span key={index} style={{marginRight: "5px", color: "#A797FF"}}>#{tag}</span>
                                    ))}
                                </p>
                            )}
                            <p style={{fontSize: "14px"}}>콘텐츠 등급: {itemData.content_rating}</p>
                            <p style={{fontSize: "14px"}}>방영 연도: {itemData.air_year_quarter}</p>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                            background: '#e6e6e6',
                            borderRadius: '20px',
                            padding: '10px 15px',
                            width: '100px',
                            justifyContent: 'center', // 중앙 정렬을 위해 추가된 속성
                            cursor: 'pointer'
                        }}
                                onClick={pulsButton}>
                            <img
                                src={isPulsActive ? "/image/puls2.png" : "/image/puls.png"}
                                alt="보고싶다"
                                style={{
                                    width: '30px', height: '20px',
                                    filter: isPulsActive ?
                                        'invert(50%) sepia(95%) saturate(750%) hue-rotate(250deg) brightness(90%) contrast(85%)'
                                        : 'none'
                                }}
                            /></button>

                        <button style={{
                            justifyContent: 'center', // 중앙 정렬을 위해 추가된 속성
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                            background: '#e6e6e6',
                            borderRadius: '20px',
                            padding: '10px 15px',
                            cursor: 'pointer',
                            width:'100px'

                        }}onClick={eyeButton}>

                            <img src="/image/eye.png" alt="보는 중 " style={{width: '30px', height: '15px',
                                filter: isEyeActive ?     'invert(50%) sepia(95%) saturate(750%) hue-rotate(250deg) brightness(90%) contrast(85%)'
                                    : 'none'}}/>


                        </button>
                        {/*<Button onClick={handleButtonClick} style={{outline: 'none',marginTop:"5px"}}>*/}
                        {/*    <TbThumbUp />*/}
                        {/*</Button>*/}
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: 'none',
                            background: '#e6e6e6',
                            borderRadius: '20px',
                            width:'100px',
                            justifyContent: 'center',
                            // 여기서 내부 여백을 조정합니다.
                            cursor: 'pointer'
                        }}>
                            <ContentModal show={penOnOff} onHide={() => setPenOnOff(false)} name={itemData.name} itemId={itemId}/>
                            <a onClick={penButton}>
                                <img src="/image/pen.png" alt="코멘트"
                                     style={{width: '50px', height: 'auto',   filter: isPenActive ?     'invert(50%) sepia(95%) saturate(750%) hue-rotate(250deg) brightness(90%) contrast(85%)'
                                             : 'none'}}/>
                            </a>
                        </button>

                    </div>
                    {/*<hr style={{borderTop: '3px double black', marginBottom: '10px', color: 'black'}}/>*/}

                </div>
                <div className={"p-3"}>
                    <MOther/>
                </div>

            </div>
        </div>
    );
}

export default EpisodesList;