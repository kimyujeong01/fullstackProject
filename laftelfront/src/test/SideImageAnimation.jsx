import React, { useState, useEffect } from 'react';

function SideImageAnimation(props){

    const {imageSrc} = props;
    const [position, setPosition] = useState(0);

    // 이미지가 반복되면서 스크롤 되어야 합니다. 따라서 이미지들을 가로로 나열한 구조를 만들어야 합니다.
    const imageWidth = 2500; // 하나의 이미지 너비입니다.
    const containerWidth = 1920; // 컨테이너의 너비를 정의합니다.

    // 이미지가 연속되어 보이기 위해 두 개의 이미지를 배열에 추가합니다.
    const images = [
        imageSrc, // 오리지널 이미지
        imageSrc,
        imageSrc// 복제된 이미지
    ];

    // 이미지 전체를 컨테이너 너비만큼 옆으로 옮겨야 하는 지점 설정
    const scrollResetPoint = -imageWidth;

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) => {
                // 마지막 이미지에 도달하면 position을 0으로 재설정하여 무한 스크롤 효과를 만듭니다.
                if (prevPosition <= scrollResetPoint) {
                    return 0; // 순간적으러 원래 위치(첫 번째 이미지)로 이동
                }
                return prevPosition - 1; // 매 interval마다 이미지를 2픽셀씩 이동시킵니다
            });
        }, 50); // 이미지가 움직이는 속도를 조절합니다. 수치는 빠르기를 나타냅니다.

        // 컴포넌트 언마운트 시 자동 재생 멈춤
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: `${containerWidth}px`, overflow: 'hidden', whiteSpace: 'nowrap', paddingTop:'10px' }}>
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`이미지 ${index}`}
                    style={{
                        width: `${imageWidth - 100}px`, // 이미지의 원래 너비를 사용
                        height : '20vh',
                        display: 'inline-block',
                        position: 'relative',
                        left: `${position}px`
                    }}
                />
            ))}
        </div>
    );
};

export default SideImageAnimation;