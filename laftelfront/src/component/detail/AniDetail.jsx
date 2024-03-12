import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

import ListView from "./ListView";
import SimilarAni from "./SimilarAni";
import Asr from "./Asr";
import tag from "../../css/Tag.module.css";
import Comment from "./Comment";
import ComModal from "./ModalCollection/ComModal";
import Lasr from "./Lasr";

function AniDetail(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.state?.item;
    const [animeDetail, setAnimeDetail] = useState([]);
    const [animeImg, setAnimeImg] = useState();
    const [animeTag, setAnimeTag] = useState([]);
    const [animeInto, setAnimeInto] = useState();
    const [simAni, setSimAni] = useState([]);
    const [isEyeActive, setIsEyeActive] = useState(false);
    const [isPulsActive, setIsPulsActive] = useState(false);
    const [isPenActive, setIsPenActive] = useState(false);
    const [penOnOff, setPenOnOff] = useState(false);
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);

    let userInfo = {userId: username, aniIdx: itemId, aniTitle: "", aniImgUrl: ""};

    const onErrorImg = (e) => {
        e.target.src = "/image/background.png";
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        let now = new Date();

        axios.get(`/api/v1.0/items/${itemId}/detail/`)
            .then(res => {

                const {data} = res;
                const {main_tag} = data;
                const {related_item} = res.data;
                const {animation_info} = res.data;

                const imageUrl = data.img;
                const splitUrl = imageUrl.split('/'); // URL '/'를 기준으로 나누기
                const fileName = splitUrl[splitUrl.length - 1];


                setAnimeTag(main_tag)
                setAnimeImg(fileName);
                setAnimeInto(animation_info);
                setAnimeDetail(data);
                setSimAni(related_item);
            })
            .catch(err => {
                console.log(err);
            });

        axios.post('/aniDetail/wish', userInfo)
            .then(res => {
                console.log(res.data.result);
                setIsPulsActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })

        axios.post('/aniDetail/viewing', userInfo)
            .then(res => {
                console.log(res.data.result);
                setIsEyeActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })

        axios.post('/aniDetail/review', userInfo)
            .then(res => {
                console.log(res.data.result);
                setIsPenActive(res.data.result);
            })
            .catch(err => {
                console.log(err);
            })


    }, [itemId]);

    userInfo = {userId: username, aniIdx: itemId, aniTitle: animeDetail.name, aniImgUrl: animeDetail.img};

    const pulsButton = (e) => {
        if (username === null) {
            alert("로그인 후 이용해 주세요");
        } else {
            axios.post('/aniDetail/wishCheck', userInfo)
                .then(res => {
                    console.log(res.data.result);
                    setIsPulsActive(res.data.result);
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
                navigate("/LoginPage"); // 마이페이지로 이동하도록 수정
            } else {
                setPenOnOff(true);
            }
        }
    }

    const eyeButton = (e) => {
        if (username === null) {
            alert("로그인 후 이용해 주세요");
        } else {
            axios.post('/aniDetail/viewingCheck', userInfo)
                .then(res => {
                    console.log(res.data.result);
                    setIsEyeActive(res.data.result);
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }

    return (
        <div>
            <div className={"position-relative"}>
                <img src={`https://thumbnail.laftel.net/items/full/${animeImg}`}
                     style={{width: "100%", height: "550px", objectFit: "cover", objectPosition: "80% 40%"}}
                     onError={onErrorImg}/>
                <div className={"position-absolute text-white fw-bold bg-dark bg-opacity-25"}
                     style={{bottom: "5px", left: "360px"}}>
                    <h2>{animeDetail.name}</h2>
                    <span className={"me-2"}>{animeInto?.air_year_quarter}</span>
                    <span className={"me-2"}>{animeInto?.medium}</span>
                    <span>{animeInto?.distributed_air_time}</span>
                </div>
            </div>


            <div className={"container"}>
                <div className={"row m-5"}>
                    <div className={"col-sm-3 text-center"}>
                        <img src={animeDetail.img} alt={"이미지"}/>
                        <div className={`${tag.tagContainer} row row-cols-2`}>
                            {
                                animeTag.map((item, index) => {
                                    if (index <= 5) {
                                        return (
                                            <div className={`${tag.tag} mt-2`}>
                                                #{item.name}
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>

                    <div className={"col"}>
                        <div className={"row text-center"}>

                            <div className={"col"}>
                                <Asr itemId={animeDetail.id}/>
                            </div>
                            <div className={"col"}>
                                <Lasr itemId={animeDetail.id}/>
                            </div>
                        </div>

                        <hr/>

                        <div className={"row text-center"}>

                            <div className="col justify-content-center"
                                 style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                                <a onClick={pulsButton} style={{color: isPulsActive ? 'mediumpurple' : 'black'}}>
                                    <img src={isPulsActive ? "/image/puls2.png" : "/image/puls.png"} alt="보고싶어요" style={{
                                        width: '40px', height: 'auto', marginRight: '10px',
                                        filter: isPulsActive ? 'invert(48%) sepia(27%) saturate(1088%) hue-rotate(218deg) brightness(99%) contrast(86%)' : 'none'
                                    }}/>
                                    <span
                                        style={{marginLeft: '10px', color: isPulsActive ? 'mediumpurple' : 'black'}}>보고싶어요</span>
                                </a>
                            </div>

                            <div className="col justify-content-center"
                                 style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                                <ComModal show={penOnOff} onHide={() => setPenOnOff(false)} name={animeDetail.name}
                                          itemId={animeDetail.id}/>
                                <a onClick={penButton} style={{color: isPenActive ? 'mediumpurple' : 'black'}}>
                                    <img src="/image/pen.png" alt="코멘트"
                                         style={{
                                             width: '60px', height: 'auto', marginRight: '10px',
                                             filter: isPenActive ? 'invert(48%) sepia(27%) saturate(1088%) hue-rotate(218deg) brightness(99%) contrast(86%)' : 'none'
                                         }}/>
                                    <span style={{color: isPenActive ? 'mediumpurple' : 'black'}}>코멘트</span>
                                </a>
                            </div>

                            <div className="col justify-content-center"
                                 style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                                <a onClick={eyeButton} style={{color: isEyeActive ? 'mediumpurple' : 'black'}}>
                                    <img src="/image/eye.png" alt="보는중" style={{
                                        width: '40px', height: 'auto', marginRight: '10px',
                                        filter: isEyeActive ? 'invert(48%) sepia(27%) saturate(1088%) hue-rotate(218deg) brightness(99%) contrast(86%)' : 'none'
                                    }}/>
                                    <span style={{marginLeft: '10px', color: isEyeActive ? 'mediumpurple' : 'black'}}>보는중</span>
                                </a>
                            </div>

                        </div>

                        <hr/>
                        <div>
                            <p className={"fs-6 lh-lg"}>{animeDetail.content}</p>
                        </div>
                    </div>

                </div>
            </div>

            <hr/>

            <div className={"container"}>
                <p className={"m-5"}>
                    <Comment itemId={animeDetail.id}/>
                </p>
            </div>

            <hr/>
            <div className={"container"}>
                <p className={"m-5"}>
                    <ListView itemId={animeDetail.id}/>
                </p>
            </div>
            <br/>
            <div className={"container"}>
                <p className={"m-5"}>
                    <SimilarAni simAni={simAni}/>
                </p>
            </div>
        </div>
    );
}

export default AniDetail;