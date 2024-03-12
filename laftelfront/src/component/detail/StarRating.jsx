// Emotion 라이브러리에서 styled를 가져옵니다.
import styled from "@emotion/styled";
// React에서 useState를 가져옵니다.
import React, {useState} from "react";
import StarInput from "./StaInput";
import axios from "axios";
// StarInput 컴포넌트를 가져옵니다.


// styled-components를 사용하여 스타일링된 컴포넌트들을 생성합니다.
const Base = styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const RatingField = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border: none;
    transform: translateY(2px);

    // 별점이 선택되었을 때 및 호버 상태일 때 색상을 변경하는 CSS 규칙들입니다.

    input:checked ~ label,
    label:hover,
    label:hover ~ label {
        transition: 0.2s;
        color: mediumpurple !important;
    }
`;

// StarRating 컴포넌트 정의
const StarRating = (props) => {

    // 별점 상태를 관리하는 useState 훅을 사용합니다.
    const [rating, setRating] = useState(0);
    const value = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const itemId = props.itemId;


    // 별점을 클릭했을 때 호출되는 핸들러 함수입니다.
    const handleClickRating = (value) => {

        props.getStarRating(value);




    };

    // 컴포넌트를 렌더링합니다.
    return (
        <div>
            <Base>
                {/* 별점 컴포넌트에 이름 부분을 추가합니다. */}
                {/* 별점을 나타내는 필드를 생성하고 별점 컴포넌트를 포함시킵니다. */}
                <RatingField>
                    {/* 별점 컴포넌트를 여러 개 생성하고 각각의 값을 설정합니다. */}
                    {value.map((value, index) => (
                        <StarInput
                            key={index}
                            // 클릭 이벤트를 처리하는 함수를 전달합니다.
                            onClickRating={handleClickRating}
                            // 각 별의 값을 설정합니다.
                            value={value}

                            // 별이 반 개일 경우를 판단하여 isHalf prop을 설정합니다.
                            isHalf={value % 1 !== 0} // 소수점인 경우 반 개의 별

                        />
                    ))}
                </RatingField>

            </Base>
        </div>
    );
};

// StarRating 컴포넌트를 내보냅니다.
export default StarRating;