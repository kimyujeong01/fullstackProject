import React, { useState } from 'react';
import './sideMenu.css';
import {FaHamburger} from "react-icons/fa";
import { CiSquareCheck } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { FaCreditCard } from "react-icons/fa";
import { FaCookie } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineInbox } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const Logout = () =>{
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userInfo');
        window.location.reload(false);
    }

    const login = () =>{
        navigate('/login');
    }

    const setting = () =>{
        navigate('/setting');
    }

    return (
        <>
            <GiHamburgerMenu className="icon me-2" size="35px" onClick={toggleMenu}></GiHamburgerMenu>
            <div className={`side-menu ${isOpen ? 'open' : ''}`}>

                {/* 메뉴 내용 */}
                {/*프로필 영역*/}
                <div style={{height: '32vh'}} className={''}>
                    {username ?
                        (
                            <>
                                <div className={'ms-4 mt-2'}>
                                    <img
                                        src={'https://thumbnail.laftel.net/profiles/default/e31c3b04-8900-4e76-8f15-f02e26dadc26.jpg'}
                                        style={{width: '50vw', height: '50vw', borderRadius: '50%'}}></img>
                                    <h2 className={'ms-auto'} style={{color: 'mediumpurple'}}>{username}님</h2>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    style={{width: '100%', color: 'mediumpurple'}}
                                    onClick={()=>{navigate('/LoginPage')}}
                                >
                                    보관함
                                </button>
                            </>
                        )
                        : ( // username 이 false일 때 여러 엘리먼트를 반환하기 때문에 fragment로 감싼다.
                            <>
                                <img
                                    src="/image/logo1.png"
                                    style={{objectFit: 'cover', height: '25vh', width: '100%'}}
                                    alt="로고 이미지" // 이미지에 alt 속성을 제공하는 것이 좋습니다.
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{width: '100%'}}
                                    onClick={login}
                                >
                                    로그인
                                </button>
                            </>
                        )
                    }
                </div>
                <div style={{
                    height: '20vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTop: '10px solid lightgrey',
                    borderBottom: '10px solid lightgrey'
                }}>
                    <Link to={'/Finder'} style={{textDecoration: 'none', color: 'mediumpurple'}}>
                        <div style={{display: 'flex', flexDirection: 'row', marginRight: '20px'}}>
                            <CiSquareCheck size='25px'></CiSquareCheck>
                            <p className={'ms-2'}>태그 검색</p>
                        </div>
                    </Link>
                    <Link to={"/day"} style={{textDecoration: 'none', color: 'mediumpurple'}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <MdOutlineCalendarToday size='22px'></MdOutlineCalendarToday>
                            <p className={'ms-2'}>요일별 신작</p>
                        </div>
                    </Link>

                </div>
                <div style={{
                    height: '10vh',


                    borderBottom: '1px solid lightgrey'
                }}>
                    <div className={'mt-3 ps-4'}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                textDecoration: 'none',
                                color: 'mediumpurple',
                                textAlign: 'center'
                            }}>
                            <FaCreditCard size='22px'></FaCreditCard>
                            <p className={'ms-2'}>라프텔 멤버쉽</p>
                        </div>
                    </div>

                    <div className={'mt-1 ps-4'}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                textDecoration: 'none',
                                color: 'mediumpurple'
                            }}>
                            <FaCookie size='22px'></FaCookie>
                            <p className={'ms-2'}>쿠키 결제</p>
                        </div>
                    </div>
                </div>
                {username
                    ?
                    (
                    <>
                <div className={'mt-3 ps-4'}>
                    <div onClick={setting}
                        style={{display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'grey'}}>
                        <CiSettings size='22px'></CiSettings>
                        <p className={'ms-2'}>설정</p>
                    </div>
                </div>
                <div className={'mt-3 ps-4'}>
                    <div onClick={Logout}
                        style={{display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'grey'}}>
                        <RxExit size='22px'></RxExit>
                        <p className={'ms-2'}>로그아웃</p>
                    </div>
                </div>
                </>
                    )
                    : ''
            }
            </div>
            {isOpen && <div className="backdrop" onClick={toggleMenu}/>}
        </>
    );
};

export default SideMenu;