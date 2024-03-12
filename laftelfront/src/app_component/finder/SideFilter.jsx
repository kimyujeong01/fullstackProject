import React, {useEffect, useRef, useState} from 'react';
import '../layout/sideMenu.css';


import {Link, useNavigate} from "react-router-dom";





import {IoFilter, IoReloadOutline} from "react-icons/io5";

import MCheckBoxCustom from "../../style/MCheckBoxCustom";
import {Form} from "react-bootstrap";


function SideFilter(props) {

    const [checkedItems, setCheckedItems] =useState({});

    const [isOpen, setIsOpen] = useState(false);
    //체크박스 아이템들
    const [genres, setGenres] = useState([]);
    const [excludeGenres, setExcludeGenres] = useState([]);
    const [tags, setTags] = useState('');
    const [excludeTags, setExcludeTags] = useState([]);
    const [years, setYears] = useState([]);

    const navigate = useNavigate();
    const data = sessionStorage.getItem('userId');
    const username = JSON.parse(data);

    const menuRef = useRef(); // 메뉴의 참조를 생성합니다.
    //태그 선택값들

    //드롭다운 영역
    const [genreView, setGenreView] = useState(false);
    const [tagView, setTagView] = useState(false);
    const [yearView, setYearView] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);

    };

    //부모한테 전달하는
    useEffect(() => {
        props.onFilterChange(genres, excludeGenres, tags,excludeTags, years);
    }, [genres, excludeGenres,tags,excludeTags,years]);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); // 메뉴 외부 클릭 시 메뉴를 닫습니다.
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);


    const clearAll = () => {


        setCheckedItems('');
        setGenres([]);
        setExcludeGenres([]);
        setTags([]);
        setExcludeTags([]);
        setYears([]);


    }



// 스타일 부분
    const divArea = {

        height: '50px',
        borderTop: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        display: 'flex',
        alignItems: 'center',


    };
    const handleCheckboxGenres = (genre) => {
        setCheckedItems(prev => {
            const current = prev[genre] || 0;
            const newStatus = (current + 1) % 3; // 0 -> 1 -> 2 -> 0

            // 새로운 장르 상태에 따라 genres와 excludeGenres 수정합니다.
            setGenres((currentGenres) => {
                if (newStatus === 1) {
                    return [...currentGenres, genre];
                } else {
                    return currentGenres.filter((gItem) => gItem !== genre);
                }
            });

            setExcludeGenres((currentExcludeGenres) => {
                if (newStatus === 2) {
                    return [...currentExcludeGenres, genre];
                } else {
                    return currentExcludeGenres.filter((exGenre) => exGenre !== genre);
                }
            });

            return {
                ...prev,
                [genre]: newStatus
            };
        });
    };
    const handleCheckboxTags = (tag) => {

        setCheckedItems(prev => {
            const current = prev[tag] || 0;
            const newStatus = (current + 1) % 3; // 0 -> 1 -> 2 -> 0


            if (newStatus === 1) { // 첫 번째 클릭
                setTags((g) => [...g, tag]);
                setExcludeTags((eg) => eg.filter((exTag) => exTag !== tag));
            } else if (newStatus === 2) { // 두 번째 클릭
                setExcludeTags((eg) => [...eg, tag]);
                setTags((g) => g.filter((gItem) => gItem !== tag));
            } else { // 세 번째 클릭

                setTags((g) => g.filter((gItem) => gItem !== tag));
                setExcludeTags((eg) => eg.filter((exTag) => exTag !== tag));
            }

            return {
                ...prev, [tag]: newStatus
            };
        });
    };
    const handleyearsChange = (selectedYear, isChecked) => {
        if (isChecked) {
            // 체크박스가 선택되면 years 배열에 추가합니다.
            setYears(prevYears => [...prevYears, selectedYear]);
        } else {
            // 체크박스가 해제되면 years 배열에서 제거합니다.
            setYears(prevYears => prevYears.filter(year => year !== selectedYear));
        }
    };

    return (
        <>
            <div className="btn btn-primary btn-sm float-end" onClick={toggleMenu}>

                <IoFilter/>
                <span>필터</span>


            </div>
            <div className={`side-menu ${isOpen ? 'open' : ''}`}  >
                <div>
                    {/* 메뉴 내용 */}
                    {/*필터영역*/}
                    <div style={{marginTop: '50px', height: '50px', display: 'flex', alignItems: 'center'}}
                         className={'d-flex justify-content-between'}>

                        <span style={{marginLeft: '10px'}}>필터</span>
                        <div>
                            <IoReloadOutline className="icon-style"/>
                            <span className="mt-2 me-3" onClick={clearAll}>전체초기화</span>
                        </div>
                    </div>

                    <div/>
                    <div style={divArea} onClick={() => setGenreView(!genreView)}>
                        <span style={{marginLeft: '10px'}}>장르</span>
                    </div>
                    {genreView && (
                        <ul style={{listStyleType: 'none'}}>
                            {['BL', '공포', '무협', '스릴러', '아이돌', '음악', '추리', '하렘', 'GL 백합', '드라마', '미스터리', '스포츠', '악역영애', '이세계', '치유', 'SF', '로맨스', '범죄', '시대물', '액션', '일상', '특촬', '개그', '모험', '성인', '아동', '음식', '재난', '판타지'].map((genre, index) => (
                                <li key={genre}>
                                    <MCheckBoxCustom
                                        text={genre}
                                        checked={checkedItems[genre] || false}
                                        onChange={() => handleCheckboxGenres(genre)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div style={divArea} onClick={() => setTagView(!tagView)}>
                        <span style={{marginLeft: '10px'}}>태그</span>
                    </div>
                    {tagView && (
                        <ul style={{listStyleType: 'none'}}>
                            {['가족', '동양풍', '마법소녀', '선생님', '뱀파이어', '시간여행', '오타쿠', '좀비'
                                , '퇴마', '감동', '두뇌싸움', '먼치킨', '복수', '성별전환', '역하렘',
                                '학교', '게임', '로봇', '무거움', '삼각관계', '성장', '연예인', '육아', '짝사랑'
                                , '동물', '루프물', '배틀', '서양풍', '슬픔', '열혈', '정치', '철학'].map((tags, index) => (
                                <li key={tags}>
                                    <MCheckBoxCustom
                                        text={tags}
                                        checked={checkedItems[tags] || false}
                                        onChange={() => handleCheckboxTags(tags)}
                                    />
                                </li>
                            ))}
                        </ul>)}
                    <div style={divArea} onClick={() => setYearView(!yearView)}>
                        <span style={{marginLeft: '10px'}}>년도</span>
                    </div>
                    {yearView && (
                        <ul style={{listStyleType: 'none'}}>
                        {
                            ['2024년 2분기', '2024년 1분기', '2023년 4분기', '2023년 3분기',
                            '2023년 2분기', '2023년 1분기', '2022년', '2021년', '2020년'
                            , '2019년', '2018년', '2017년', '2016년', '2015년', '2014년', '2013년'
                            , '2012년', '2011년', '2010년', '2000년대', '2000년대 이전'].map(label => (
                                <li key={label}
                                    style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginRight:'10px'}}>
                                    <span style={{alignSelf: 'center'}}>{label}</span>
                                    <Form.Check
                                        type="checkbox"
                                        id={`default-checkbox-${label}`}
                                        checked={years.includes(label)}
                                        onChange={(e) => handleyearsChange(label, e.target.checked)}
                                    />
                                </li>
                            ))}

                        </ul>)}
                </div>
            </div>
            {isOpen && <div className="backdrop" onClick={toggleMenu}/>}
        </>
    );
};

export default SideFilter;