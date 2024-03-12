import React, {useState} from "react";
import styled from "styled-components";



// 부모 컴포넌트에게 변경사항을 알립니다.
function CheckBoxCustom({ text, checked, onChange }) {
    const [checkState, setCheckState] = useState(checked ? 1 : 0);  // 체크 상태 초기화 수정

    const handleOnChange = () => {
        // 다음 상태 계산 (0 -> 1 -> 2 -> 0 순환)
        const newCheckState = (checkState + 1) % 3;
        setCheckState(newCheckState);

        // 부모 컴포넌트로부터 받은 onChange 함수에 새 상태를 전달합니다.
        if (onChange) {
            onChange(newCheckState);
        }
    };

    const getClass = () => {
        switch(checked) {
            case 1: return 'checked_first';
            case 2: return 'checked_second';
            default: return '';
        }
    };

    // StyledInput의 checked 상태와 className 모두 부모 컴포넌트로부터 받은 prop을 기반으로 합니다.
    return (
        <StyledLabel htmlFor={text} className={'d-flex justify-content-between'}>
            <StyledP>{text}</StyledP>
            <StyledInput
                type="checkbox"
                id={text}
                name={text}
                checked={checked} // 첫 번째 상태일 때만 checked로 간주한다.
                onChange={handleOnChange}
                className={getClass()} // 현재 상태에 맞는 클래스 이름을 할당합니다.
            />

        </StyledLabel>
    );
}

export default CheckBoxCustom;

const StyledInput = styled.input`
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border: 1.2px solid gainsboro;
    border-radius: 0.35rem;

    margin-right: 10px;

    &.checked_first:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: limegreen;
    }

    &.checked_second:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 16'%3e%3crect width='100' height='16' fill='white'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: red;
    }
`;
const StyledLabel = styled.label`
    height: 50px;
    display: flex;
    align-items: center;
    user-select: none;
`;

const StyledP = styled.p`
    margin-left: 0px;
    margin-top: 1rem;

  
`;