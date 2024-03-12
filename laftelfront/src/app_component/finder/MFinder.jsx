import React, {useEffect, useRef, useState} from "react";

import gridImg from "../../css/gridImage.module.css";

import axios from "axios";

import MHeaderNoStyle from "../layout/MHeaderNoStyle";
import SideFilter from "./SideFilter";
import './fixed.css';
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";


function MFinder(props) {

    const [isFixed, setIsFixed] = useState(false);

    const [genres, setGenres] = useState('');
    const [excludeGenres, setExcludeGenres] = useState([]);
    const [tags, setTags] = useState('');
    const [searchItem, setSearchItem] = useState([]);
    const [offset, setOffset] = useState(0);
    const [excludeTags, setExcludeTags] = useState([]);
    const [count, setCount] = useState('');
    const [years, setYears] = useState([]);
    const DivRef = useRef(null);

    const [checkedItems, setCheckedItems] = useState({});
    let cnt = 0;

    const toggleBackground = () => {
        setIsFixed(!isFixed);
    };

    const handleFilterChange = (newGenres, newExcludeGenres, newTags, newExcludeTags, newYears) => {
        setGenres(newGenres);
        setExcludeGenres(newExcludeGenres);
        setTags(newTags);
        setExcludeTags(newExcludeTags);

        setYears(newYears);
        // genres와 excludeGenres를 이용하여 데이터를 다시 불러오기
    };



    // 년도별



    useEffect(() => {

        setSearchItem([]);
        setOffset(0);
    }, [genres, excludeGenres, tags, excludeTags, years]);


    useEffect(() => {

        axios.get(`api/search/v1/discover/?sort=rank&genres=${genres}&exclude_genres=${excludeGenres}&tags=${tags}&exclude_tags=${excludeTags}&years=${years}&viewable=true&offset=${offset}&size=60`)
            .then(res => {
                cnt++
                const aniItem = res.data.results;
                console.log(aniItem.count);
                setCount(res.data.count);
                if (cnt === 1) {
                    setSearchItem(prevAniItem => [...prevAniItem, ...aniItem]);
                }
                console.log(tags)


            })
            .catch(err => {
                console.log(err);
            });


        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            setOffset(prevState => prevState + 60);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {

            window.removeEventListener('scroll', handleScroll);
        };


    }, [genres, tags, offset, years]);



    return (<div className={isFixed ? "fixed-background" : ""} ref={DivRef} >
            <MHeaderNoStyle/>
            <div className={"mx-4"} style={{marginTop: "100px", marginBottom: "30px", display: "block"}}>
                <h2>태그 검색</h2>
                <br/>
                <div>
                    <p>

                        <span>선택된 필터  </span>
                        <span onClick={toggleBackground}><SideFilter onFilterChange={handleFilterChange}/></span>
                        <hr style={{borderTop: "1px solid black", margin: "20px 0"}}/>

                        <div>
                            {((genres || []).concat(tags || []).concat(years || []).length > 0 || (excludeTags || []).concat(excludeGenres || []).length > 0) ? (
                                <span>
            {(genres || []).concat(tags || []).concat(years || []).length > 0 ? (
                <>
                    <FaRegCheckSquare style={{color: 'green'}}/>
                    {(genres || []).concat(tags || []).concat(years || []).map((item, index) => (
                        <button key={index} style={{borderRadius: '50rem', background: 'white', margin: '5px'}}>
                            {item}
                        </button>
                    ))}
                </>
            ) : ''}
                                    {(excludeTags || []).concat(excludeGenres || []).length > 0 ? (
                                        <>
                                            <FaRegSquareMinus style={{color: 'red'}}/>
                                            {(excludeTags || []).concat(excludeGenres || []).map((excludeItem, index) => (
                                                <button key={index} style={{
                                                    borderRadius: '50rem',
                                                    background: 'white',
                                                    margin: '5px'
                                                }}>
                                                    {excludeItem}
                                                </button>
                                            ))}
                                        </>
                                    ) : ''}
        </span>
                            ) : null}
                        </div>

                    </p>
                </div>



                <p className={"mt-2"}>총 {count}개의 작품이 검색되었어요!</p>

                <div>
                    <div>
                        <div className="row g-sm-3">
                            {searchItem.map((item, index) => {
                                const imageUrl = item.images.length > 1 ? item.images[1].img_url : item.images[0].img_url;
                                return (<div key={index} className="col-6" style={{marginRight: '0px'}}>
                                    <div>
                                        <img src={imageUrl} alt={item.name} className={gridImg.keyImg}
                                             style={{
                                                 width: '100%',
                                                 height: '12vh',
                                                 objectFit: "cover",
                                                 borderRadius: '10px'
                                             }}/>
                                    </div>
                                    <div className="d-flex align-items-start">
                                        <p className="mt-2">{item.name}</p>
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>


            </div>
    </div>);
}

export default MFinder;