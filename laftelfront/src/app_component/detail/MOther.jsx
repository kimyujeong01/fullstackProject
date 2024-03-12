import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header2 from '../../component/layout/Header2';
import { Nav } from 'react-bootstrap';
import TabContent from '../../component/other/TabContent';
import Similar from './Similar';
import MTabContent from "./MTabContent"; // Similar 컴포넌트 import

function MOther(props) {
    const [tab, setTab] = useState(0);
    const location = useLocation();

    return (
        <div>
            {/* Header2 컴포넌트를 여기서 사용하는 것으로 가정합니다. */}

            <div className={'m-1 py-3'}>
                {/* 네비게이션 탭 */}
                <Nav variant="underline" defaultActiveKey={0} className={'border-bottom'}>
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(0)}>에피소드</Nav.Link>
                    </Nav.Item>
                    {/* 비슷한 작품 탭 */}
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(1)}>비슷한 작품</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => setTab(2)}>사용자 평점</Nav.Link>
                    </Nav.Item>
                </Nav>
                {/* 탭 콘텐츠 */}
                <div className={''}>
                    <MTabContent tab={tab} />
                </div>
            </div>
        </div>
    );
}

export default MOther;
