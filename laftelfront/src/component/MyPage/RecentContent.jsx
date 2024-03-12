import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RecentContent(props) {
    // 로딩 상태를 관리하기 위한 상태
    const [loading, setLoading] = useState(true);
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const userInfo = { userId: username };
    const [worked,setWorked] = useState(0);
    const [selectedItemCount, setSelectedItemCount] = useState(1);

    // 애니메이션 정보를 담을 상태
    const [aniInfo, setAniInfo] = useState([]);

    // React Router의 useNavigate 훅을 사용하여 페이지 간 이동을 관리
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 애니메이션 정보를 불러오는 API 호출
    useEffect(() => {
        const data = sessionStorage.getItem('userId');
        const username = JSON.parse(data);
        const userInfo = { userId: username };

        // 애니메이션 정보를 불러오는 API 호출
        axios.post('/mypage/view', userInfo)
            .then(res => {
                // API 응답 데이터에서 애니메이션 정보 추출 및 상태 업데이트
                setAniInfo(res.data.result);
            })
            .catch(err => {
                console.error("애니메이션 정보를 불러오는 중 에러 발생:", err);
            })
            .finally(() => {
                // 로딩 상태를 해제하여 화면에 애니메이션 정보를 표시
                setLoading(false);
            });
    }, []);

    // 한 행에 표시될 아이템 수
    const itemsPerRow = 4;

    // 상세 페이지로 이동하는 함수
    const navigateToDetail = (aniId) => {
        navigate(`/detail`);
    };

    const postData = {
        userId: 'na'
    };
    useEffect(() => {
        axios
            .post("/mypage/worked", postData)
            .then((res) => {
                setWorked(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo.userId]);

    return (

        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '600px', scrollbarWidth: 'none'}}>
            <div className="d-flex justify-content-between" style={{marginLeft: '10px'}}>
                {worked !== null ? `작품선택: ${worked}개` : '리뷰: 0'}
            </div>
            {/* 조건부 렌더링: 애니메이션 정보가 로딩 중일 때 */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                // 조건부 렌더링: 애니메이션 정보가 있는 경우와 없는 경우

                aniInfo.length > 0 ? (
                    // 애니메이션 정보가 있는 경우: 각 행에 속하는 아이템을 출력
                    Array.from({length: Math.ceil(aniInfo.length / itemsPerRow)}, (_, rowIndex) => (
                        <div key={rowIndex} className="d-flex justify-content-start align-items-center mb-3">
                            {/* 한 행에 속하는 각각의 아이템을 출력 */}
                            {aniInfo.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((item, index) => (
                                <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.aniIdx}}>
                                    <div key={index} className="mr-3">
                                        {/* 각 아이템의 이미지 출력 */}
                                        <img
                                            src={item.aniImgUrl}
                                            alt={`Item ${index}`}
                                            className={"btn btn-none"}
                                            style={{
                                                width: '250px',
                                                height: '250px',
                                                cursor: 'pointer',
                                            }}
                                            // 상세 페이지로 이동하는 함수와 연결

                                        />
                                        {/* 각 아이템의 제목 출력 */}
                                        <div style={{textAlign: 'center'}}>
                                            <strong style={{color: 'mediumpurple'}}>{item.aniTitle}</strong>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))
                ) : (
                    // 애니메이션 정보가 없는 경우: 메시지와 이미지를 출력
                    <div style={{opacity: '0.4', textAlign: 'center'}}>
                        <img src={'/image/MyPageLogo.png'} alt={''} style={{width: '300px', height: '40vh'}}/>
                        <p>저장된 보고싶다가 없습니다.</p>
                    </div>
                )
            )}
        </div>
    );
}

export default RecentContent;