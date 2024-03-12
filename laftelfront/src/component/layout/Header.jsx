import Navbar from 'react-bootstrap/Navbar';
import { CiSearch } from "react-icons/ci";
import React, {useState, useEffect, useRef} from 'react';
import Styles from "../../css/styleTest.module.css"
import {Link, useNavigate} from "react-router-dom";
import * as events from "events";
import axios from "axios";
import {NavDropdown} from "react-bootstrap";


function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}


function Header(props) {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0)
    const [SearchInputVisible, setSearchInputVisible] = useState(false);

    const [searchMonter, setSearchMonter] = useState("");
    const [monstersData, setMonstersData] = useState([]);
    const searchInputRef = useRef();
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);

    const onfilterClick = (monster) => {
        setSearchMonter(monster); // 선택한 몬스터 이름으로 검색어 상태를 업데이트
        navigate(`/search?keyword=${monster}`)
        setSearchInputVisible(!SearchInputVisible);
    }

    const onfilterDbClick = (filter) =>{
        setSearchMonter(filter);

    }

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    const toggleSearchInput = () => {
        setSearchInputVisible(!SearchInputVisible);
    }
    const onChange = e =>{
        setSearchMonter(e.target.value);

    }



    // 외부 클릭 시 실행될 함수
    const closeSearchInput = () => {
        setSearchInputVisible(false);
        setSearchMonter("");
        setMonstersData("");
    };

    const EnterEvent = e =>{
        if(e.key === "Enter"){
            navigate(`/search?keyword=${e.target.value}`)
        }
    }

    const LogOut = (e) => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userInfo');
        window.location.reload(false);
    }

    useOutsideAlerter(searchInputRef, closeSearchInput);

    useEffect(() => {
        axios.get(`api/search/v1/auto_complete/?keyword=${searchMonter}`)
            .then(res => {
                const {data} = res;
                setMonstersData(data);
                console.log(data);

            })
            .catch(err => {
                console.log(err);
            });
    }, [searchMonter]);


    useEffect(()=>{
        window.addEventListener('scroll', updateScroll);
    });

    return (
        <div>
            <Navbar  className={scrollPosition < 100 ? Styles.HeaderContainer : Styles.change_header} style={{padding:"30px"}}>
                <Navbar.Brand  href="/" style={{
                    color: "purple",
                    fontSize: "32px",
                    fontStyle: "initial"
                }}>LAFTELPEDIA</Navbar.Brand>
                <div className={`me-auto ${scrollPosition < 100 ? Styles.header_color : Styles.change_color}`}>
                    <Link className={"me-2 text-decoration-none"} to={'Finder'}>태그검색</Link>
                    <Link className={"me-2 text-decoration-none"} to={'NewAniTotal'}>요일별 신작</Link>
                </div>
                <div className={"justify-content-end"}>
                    <div className={Styles.searchContainer } ref={searchInputRef}> {/* 이것이 부모 컨테이너입니다 */}
                        <CiSearch
                            className="icon me-3"
                            size="35px"
                            onClick={toggleSearchInput}

                        />
                        {SearchInputVisible && (
                            <input
                                className={'me-4'}
                                type="text"
                                placeholder="검색"
                                value={searchMonter}
                                onChange={onChange}
                                onKeyDown={EnterEvent}
                            />
                        )}

                        {SearchInputVisible && monstersData && (
                            <ul className={Styles.autoCompleteList}>
                                {monstersData.map((monster, index) => (
                                    <li
                                        key={index}
                                        onClick={() => onfilterClick(monster)}
                                        ondblclick={() => onfilterDbClick(monster) }
                                        className={Styles.autoCompleteItem}
                                    >
                                        {monster}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
                {
                    username
                        ? <NavDropdown title={username+"님 환영합니다!"} id="basic-nav-dropdown">
                            <NavDropdown.Item href='/LoginPage'><Link className={"text-decoration-none text-black"} to={'/LoginPage'}>마이페이지</Link></NavDropdown.Item>
                            <NavDropdown.Item onClick={LogOut}>로그아웃</NavDropdown.Item>
                        </NavDropdown> // username 값이 있을 때
                        : <Link className={"text-decoration-none m-3"} to={'/Login'}>로그인/가입</Link> // username 값이 없을 때
                }

            </Navbar>
        </div>
    );
}

export default Header;