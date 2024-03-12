import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function WishlistContent(props) {
    const [selectedItemCount, setSelectedItemCount] = useState(1);
    const navigate = useNavigate();
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const userInfo = { userId: username };
    const [aniInfo, setAniInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('/mypage/missyou', userInfo)
            .then(res => {
                console.log(res.data);
                setAniInfo(res.data.result);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const itemsPerRow = 4;

    const renderAnimationData = () => (
        <div>
            <div className="d-flex justify-content-between" style={{marginLeft:'10px'}}>
                {work !== null ? `작품선택: ${work}개` : '리뷰: 0'}
            </div>
            {Array.from({ length: Math.ceil(aniInfo.length / itemsPerRow) }, (_, rowIndex) => (
                <div key={rowIndex} className="d-flex justify-content-start align-items-center mb-3">
                    {aniInfo.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((item, index) => (
                        <Link key={index} className={"text-decoration-none"} to={`/Detail`} state={{ item: item.aniIdx }}>
                            <div className="mr-3">
                                <img
                                    src={item.aniImgUrl}
                                    alt={`Item ${index}`}
                                    className={"btn btn-none"}
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        cursor: 'pointer',
                                    }}
                                />
                                <div style={{ textAlign: 'center' }}>
                                    <strong style={{ color: 'mediumpurple' }}>{item.aniTitle}</strong>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );

    const [work,setWork] = useState(0);

    const postData = {
        userId: 'na'
    };

    useEffect(() => {
        axios
            .post("/mypage/work", postData)
            .then((res) => {
                setWork(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo.userId]);




    return (
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px', scrollbarWidth: 'none'}}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                aniInfo.length > 0 ? (
                    renderAnimationData()
                ) : (
                    <div style={{opacity: '0.4', textAlign: 'center'}}>
                        <img src={'/image/MyPageLogo.png'} alt={''} style={{width: '300px', height: '40vh'}}/>
                        <p>저장된 보고싶다가 없습니다.</p>
                    </div>
                )
            )}
        </div>
    );
}

export default WishlistContent;