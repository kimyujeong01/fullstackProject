import React, { useState, useEffect } from 'react';
import './popup.css';
import axios, { get } from "axios";
import { Link } from "react-router-dom";
import aniDetail from "../detail/AniDetail";

const AdPopup = () => {
    const [showPopup, setShowPopup] = useState(-1);
    const doNotShowTodayKey = 'doNotShowAdPopupToday';
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const [getAniIdx, setGetAniIdx] = useState([]);
    const [updateAni, setUpdateAni] = useState([]);

    useEffect(() => {
        const userInfo = { userId: username };
        axios.post("/mypage/newAniCheck", userInfo)
            .then((res) => {
                let data = res.data;
                // Convert to array of numbers
                setGetAniIdx(Array.isArray(data) ? data.map(Number) : [Number(data)]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [username]);

    useEffect(() => {
        const aniIdxList = getAniIdx.map(item => parseInt(item)); // Numbers
        const today = new Date();

        axios.get(`/api/search/v2/daily/`)
            .then((res) => {
                const fullData = res.data;
                const filteredData = fullData.filter((item) => aniIdxList.includes(item.id));

                const updateAniToday = filteredData.filter((item) => {
                    const episodeDate = new Date(item.latest_episode_created);
                    return today.getFullYear() === episodeDate.getFullYear() &&
                        today.getMonth() === episodeDate.getMonth() &&
                        today.getDate() === episodeDate.getDate();
                });

                if (updateAniToday.length > 0) {
                    const popupsToShow = updateAniToday.filter(update => {
                        const popupId = update.id;
                        const storedValue = localStorage.getItem(`${doNotShowTodayKey}-${popupId}`);
                        return storedValue !== today.toDateString(); // 오늘의 날짜가 아니라면 보여줄 팝업 목록에 추가
                    });

                    setUpdateAni(updateAniToday);
                    setShowPopup(popupsToShow.length > 0 ? 0 : -1); // 첫 번째로 보여줄 팝업 설정 (있다면)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [getAniIdx]);

    const handleClosePopup = () => {
        const today = new Date().toDateString();
        const currentPopup = updateAni[showPopup];
        localStorage.setItem(`${doNotShowTodayKey}-${currentPopup.id}`, today); // 현재 팝업에 대해 '오늘 보지 않기' 저장

        const nextIndex = showPopup + 1;
        if (nextIndex < updateAni.length &&
            localStorage.getItem(`${doNotShowTodayKey}-${updateAni[nextIndex].id}`) !== today) {
            setShowPopup(nextIndex); // 다음 팝업 표시 (예정된 '보지 않기'가 아닌 경우에만)
        } else {
            setShowPopup(-1); // 모든 팝업이 꺼져야 하는 경우
        }
    };
    return (
        <>
            {showPopup !== -1 && (
                <div className="popup-overlay" key={updateAni[showPopup].id}>

                    <div className="popup-content">
                        <h1>최신화 보러가기~~</h1>
                        <Link
                            className={"text-decoration-none"}
                            to={`/Detail`}
                            state={{item: updateAni[showPopup].id}}
                        >
                            <div className="card p-2 border-0">
                                <img
                                    src={updateAni[showPopup].img}
                                    style={{width:'600px',height: "40vh", objectFit: "cover"}}
                                    className="card-img-top"
                                    alt="..."
                                />
                                <h5 className="card-title text-truncate">{updateAni[showPopup].name}</h5>
                            </div>
                        </Link>
                        <button className={'btn btn-danger'} onClick={handleClosePopup}>닫기</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdPopup;