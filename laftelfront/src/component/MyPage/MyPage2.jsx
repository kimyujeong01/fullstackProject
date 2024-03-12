import React, { useState, useEffect } from 'react';
import MyPage from "./MyPage";
import RecentContent from "./RecentContent";
import WishlistContent from "./WishlistContent";
import Review from "./MyComment";
import Header from "../layout/Header";
import axios from "axios";

function MyPage2(props) {
    // 카테고리 및 기타 상태 값 정의
    const [categories, setCategories] = useState(['보고싶다', '보는중', '코멘트']);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [selectedItemCount, setSelectedItemCount] = useState(0);

    // 사용자 정보 상태 값 정의
    const [userInfo, setUserInfo] = useState({
        username: '사용자 이름',
        email: '이메일 주소',
        profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        nickname: '찬해',
        reviews: 20,
        userId:''
    });

    // 리뷰 버튼 클릭 여부 상태 값 정의
    const [reviewsClicked, setReviewsClicked] = useState(false);
    // 총 리뷰 개수 상태 값 정의
    const [totalReviews, setTotalReviews] = useState(0);
    // 리뷰 버튼 클릭 핸들러
    const handleReviewsClick = () => {
        setReviewsClicked(!reviewsClicked);
        console.log("체크되엇습니다");
    };

    const postData = {
        userId: 'na'
    };


    // useEffect를 활용하여 서버에서 총 리뷰 개수를 가져오는 비동기 요청
    useEffect(() => {
        axios
            .post("/mypage/totallReview", postData)
            .then((res) => {
                setTotalReviews(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userInfo.userId]);


    // 카테고리 클릭 핸들러
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        // 선택된 카테고리에 따라 내용 변경
        switch (category) {
            case '보고싶다':
                setSelectedContent(<WishlistContent />);
                break;
            case '보는중':
                setSelectedContent(<RecentContent />);
                break;
            case '코멘트':
                setSelectedContent(<Review />);
                break;
            default:
                setSelectedContent(null);
                break;
        }
    };


    // 컴포넌트가 마운트될 때 기본 카테고리와 내용을 설정하는 useEffect
    useEffect(() => {
        handleCategoryClick(selectedCategory);
    }, [selectedCategory]); // selectedCategory가 변경될 때만 업데이트

    // selectedContent가 변경될 때마다 selectedItemCount 업데이트하는 useEffect
    useEffect(() => {
        // selectedContent에 항목이 있으면 해당 개수로 selectedItemCount 업데이트
        if (selectedContent && selectedContent.props && selectedContent.props.items) {
            setSelectedItemCount(selectedContent.props.items.length);
        } else {
            setSelectedItemCount(0);
        }
    }, [selectedContent]);

    // 렌더링
    return (
        <div style={{ backgroundColor: '#f0f0f0' }}>
            <Header />
            {/* MyPage2 컴포넌트의 레이아웃 */}
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh', marginTop: '0' }}>
                {/* MyPage2 내용 영역 */}
                <div style={{
                    width: '50%',
                    height: '80%',
                    marginLeft: '30px',
                    padding: '20px',
                    border: '3px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: 'white'
                }}>
                    {/* 보관함 헤더 영역 */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div style={{ position: 'relative', marginRight: '10px' }}>
                            <img src={userInfo.profileImage} alt={''}
                                 style={{ maxWidth: '100px', borderRadius: '50%' }} />
                        </div>
                 
                        <div className="d-flex align-items-end">
                            <div style={{ marginRight: '10px' }}>
                                {selectedItemCount > 0 && `(${selectedItemCount} 개)`}
                            </div>
                        </div>
                    </div>

                    {/* 카테고리 버튼 목록 */}
                    <div className="d-flex justify-content-between" style={{ height: '50px' }}>
                        {/* 리뷰 버튼 */}
                        <div className="btn btn-none" onClick={handleReviewsClick} style={{ marginRight: "20px" }}>
                            <div style={{ textAlign: 'center' }}>
                                <h5 style={{ marginBottom: '5px' }}>
                                    <strong>{userInfo.nickname}</strong>
                                </h5>
                            </div>
                            <div className={`mb-2 ${reviewsClicked ? 'purple-text' : ''}`}
                                 style={{ color: reviewsClicked ? 'purple' : 'inherit' }}>
                                {totalReviews !== null ? `코멘트: ${totalReviews}개` : '리뷰: 0'}
                            </div>
                        </div>

                        {/* 카테고리 버튼 목록 */}
                        <div className="d-flex">
                            {categories.map((category, index) => (
                                <React.Fragment key={category}>
                                    <button
                                        className={`btn ${selectedCategory === category ? 'btn-secondary' : 'btn-light'}`}
                                        onClick={() => handleCategoryClick(category)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        {category}
                                    </button>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <hr />

                    {/* 선택된 카테고리의 내용 표시 */}
                    <div>
                        {selectedContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage2;