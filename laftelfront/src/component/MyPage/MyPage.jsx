import React, { useState, useRef } from 'react';

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    username: '사용자 이름',
    email: '이메일 주소',
    profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', // 기본 이미지 URL
    nickname: '찬해',
    rating: 4.5, // 별점 추가
    reviews: 20, // 리뷰 수 추가
  });

  const [ratingClicked, setRatingClicked] = useState(false);
  const [reviewsClicked, setReviewsClicked] = useState(false);

  const fileInput = useRef(null);
  const [fileError, setFileError] = useState(null);

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // 프로필 이미지 업로드 처리 및 미리보기
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUserInfo((prevState) => ({
            ...prevState,
            profileImage: reader.result,
          }));
        }
      };
      reader.readAsDataURL(file);
      setFileError(null);
    } else {
      // 파일 선택 버튼 클릭하지 않았을 때 메시지 표시하지 않음
      setFileError(null);
    }
  };

  const handleRatingClick = () => {
    setRatingClicked(!ratingClicked);
  };

  const handleReviewsClick = () => {
    setReviewsClicked(!reviewsClicked);
  };

  return (
      <div className="d-flex align-items-center justify-content-center" style={{height: '100vh', marginTop: '0'}}>
        <div style={{width:'430px',height:'850px'}}>
          <div style={{
            width: '400px',
            height: '50%',
            marginLeft: '30px',
            padding: '20px',
            border: '3px solid #ccc',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: 'white'
          }}>

            <h5 style={{textAlign: 'left', marginBottom: '30px'}}><strong>프로필 선택</strong></h5>
            <div>
              <img src={userInfo.profileImage} alt="프로필 이미지" style={{maxWidth: '100px', borderRadius: '50%'}}/>
            </div>

            {/* 여기에 닉네임 출력 */}
            <div style={{marginTop: '20px'}}>
              <strong>{userInfo.nickname}</strong>
            </div>

            <div className="mb-3">
              <label className="btn btn-light" style={{marginTop: '30px'}}>
                프로필 선택
                <input type="file" onChange={onChange} ref={fileInput} style={{display: 'none'}}/>
              </label>
              {fileError && <p style={{color: 'red'}}>{fileError}</p>}
            </div>

            {/* 새로운 요소 추가 */}
            <div className="d-flex justify-content-center" style={{marginTop: '30px'}}>
              <div className={`mr-4 btn btn-none ${ratingClicked ? 'purple-bg' : ''}`}
                   onClick={handleRatingClick}>
                <div className={`mb-2 ${ratingClicked ? 'purple-text' : ''}`}
                     style={{color: ratingClicked ? 'purple' : 'inherit'}}>
                  {userInfo.rating}
                </div>
                <div>
                  <strong className={`mb-0 ${ratingClicked ? 'purple-text' : ''}`}
                          style={{color: ratingClicked ? 'purple' : 'inherit'}}>별점</strong>
                </div>
              </div>

              <div style={{marginLeft: '30px'}} className={`btn btn-none ${reviewsClicked ? 'purple-bg' : ''}`}
                   onClick={handleReviewsClick}>
                <div className={`mb-2 ${reviewsClicked ? 'purple-text' : ''}`}
                     style={{color: reviewsClicked ? 'purple' : 'inherit'}}>
                  {userInfo.reviews}
                </div>
                <div>
                  <strong className={`mb-0 ${reviewsClicked ? 'purple-text' : ''}`}
                          style={{color: reviewsClicked ? 'purple' : 'inherit'}}>리뷰</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MyPage;
