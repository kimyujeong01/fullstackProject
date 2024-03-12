// Emotion 라이브러리에서 styled를 가져옵니다.
import styled from "@emotion/styled";
// Emotion 라이브러리에서 css를 가져옵니다.
import { css } from "@emotion/react";
// React Icons 라이브러리에서 FaStar와 FaStarHalf를 가져옵니다.
import { FaStar, FaStarHalf } from "react-icons/fa";

// RatingField 스타일드 컴포넌트를 생성합니다.
const RatingField = styled.fieldset`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    // input이 체크되었을 때와 label에 호버 상태일 때 색상을 변경하는 CSS 규칙들입니다.
    input:checked ~ label,
    label:hover,
    label:hover ~ label {
        transition: 0.2s;
        color: mediumpurple;
    }
`;

// Input 스타일드 컴포넌트를 생성합니다.
const Input = styled.input`
    display: none;
`;

// Label 스타일드 컴포넌트를 생성합니다.
const Label = styled.label`
    cursor: pointer;
    font-size: 1.5rem;
    color: lightgray;

    // isHalf prop이 true인 경우 반 개의 별을 표시하기 위한 CSS 규칙들입니다.
    ${({ isHalf }) =>
            isHalf &&
            css`
                position: absolute;
                width: 30px;
                overflow: hidden;

                &:nth-of-type(10) {
                    transform: translate(-270px);
                }
                &:nth-of-type(8) {
                    transform: translate(-210px);
                }
                &:nth-of-type(6) {
                    transform: translate(-150px);
                }
                &:nth-of-type(4) {
                    transform: translate(-90px);
                }
                &:nth-of-type(2) {
                    transform: translate(-30px);
                }
            `}
`;

// 별의 크기를 조절한 StyledFaStar와 StyledFaStarHalf 컴포넌트를 생성합니다.
const StyledFaStar = styled(FaStar)`
    font-size: 30px; // 별의 크기 조절
`;

const StyledFaStarHalf = styled(FaStarHalf)`
    font-size: 30px; // 별의 크기 조절
`;

// StarInput 컴포넌트를 정의합니다.
const StarIn = ({ onClickRating, value, isHalf }) => {
    return (
        <>
            {/* radio input을 생성합니다. */}
            <Input type="radio" name="rating" id={`star${value}`} value={value} />
            {/* label을 생성하고 클릭 이벤트를 처리하는 함수를 전달합니다. */}
            <Label
                onClick={() => onClickRating(value)}
                isHalf={isHalf}
                htmlFor={`star${value}`}
            >
                {/* isHalf prop에 따라 반 개의 별을 표시합니다. */}
                {isHalf ? <StyledFaStarHalf /> : <StyledFaStar />}
            </Label>
        </>
    );
};

// StarInput 컴포넌트를 내보냅니다.
export default StarIn;