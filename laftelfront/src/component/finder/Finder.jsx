import React, {useEffect, useRef, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import axios from "axios";
import gridImg from "../../css/gridImage.module.css";

import CheckBoxCustom from "../../style/CheckBoxCustom"
import modalStyle from "../../css/Modal.module.css"
import styled from "@emotion/styled";
import Header2 from "../layout/Header2";
import {Link, useNavigate} from "react-router-dom";
import {IoReloadOutline} from "react-icons/io5";
import {FaRegSquareMinus} from "react-icons/fa6";
import {FaRegCheckSquare} from "react-icons/fa";

function Finder(props) {

   const navigate = useNavigate();

   const [genres, setGenres] = useState(''); //장르 추가시 추가됨.
   const [excludeGenres, setExcludeGenres] = useState([]);
   const [tags, setTags] = useState('');
   const [excludeTags, setExcludeTags] = useState([]);
   const [count, setCount] = useState('');
   const [searchItem, setSearchItem] = useState([]);
   const [offset, setOffset] = useState(0);
   const DivRef = useRef(null); //div의 스크롤 인식하려고

   const [years, setYears] = useState([]);

   //더보기 모달창
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalTagsOpen, setModalTagsOpen] = useState(false);
   const [modalYearsOpen, setModalYearsOpen] = useState(false);

   const [checkedItems, setCheckedItems] = useState({});
   const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = DivRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
         setOffset(prevState => prevState + 60);
      }
   };


//스타일

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         width: '80%',
         height: '50%'

      },
   };


   const handleCheckboxGenres = (genre) => {
      setCheckedItems(prev => {
         const current = prev[genre] || 0;
         const newStatus = (current + 1) % 3; // 0 -> 1 -> 2 -> 0

         // 새로운 장르 상태에 따라 genres와 excludeGenres 수정합니다.
         if (newStatus === 1) { // 첫 번째 클릭
            setGenres((g) => [...g, genre]); // genre 추가
            setExcludeGenres((eg) => eg.filter((exGenre) => exGenre !== genre)); // excludeGenres에서 제거
         } else if (newStatus === 2) { // 두 번째 클릭
            setExcludeGenres((eg) => [...eg, genre]); // excludeGenres에 genre 추가
            setGenres((g) => g.filter((gItem) => gItem !== genre)); // genres에서 제거
         } else { // 세 번째 클릭
            // genres와 excludeGenres에서 genre 제거
            setGenres((g) => g.filter((gItem) => gItem !== genre));
            setExcludeGenres((eg) => eg.filter((exGenre) => exGenre !== genre));
         }

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
            ...prev,
            [tag]: newStatus
         };
      });
   };

   // 년도별
   const handleyearsChange = (selectedYear, isChecked) => {
      if (isChecked) {
         // 체크박스가 선택되면 years 배열에 추가합니다.
         setYears(prevYears => [...prevYears, selectedYear]);
      } else {
         // 체크박스가 해제되면 years 배열에서 제거합니다.
         setYears(prevYears => prevYears.filter(year => year !== selectedYear));
      }
   };

   const clearAll = () => {


      window.location.reload(false);
      navigate("/Finder");


   }

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };


   //장르 변경하면 useEffect 실행 안에 값이랑 offset 값 지우기.
   useEffect(() => {

      setSearchItem([]);
      setOffset(0);
   }, [genres, excludeGenres, tags, excludeTags, years]);

   useEffect(() => {
      axios.get(`api/search/v1/discover/?sort=rank&genres=${genres}&exclude_genres=${excludeGenres}&tags=${tags}&exclude_tags=${excludeTags}&years=${years}&viewable=true&offset=${offset}&size=60`)
          .then(res => {
             const aniItem = res.data.results;
             console.log(aniItem.count);
             setCount(res.data.count);
             setSearchItem(prevAniItem => [...prevAniItem, ...aniItem]);

             console.log(tags)
          })
          .catch(err => {
             console.log(err);
          });
      const scroll = DivRef.current;

      if (scroll) {
         scroll.addEventListener('scroll', handleScroll);
      }
      return () => {
         if (scroll) {
            scroll.removeEventListener('scroll', handleScroll);
         }
      };

   }, [genres, tags, offset, years]);

   return (


       <div>

          <Header2/>
          <div className={"mx-5"} style={{marginTop: "100px", marginBottom: "30px", display: "block"}}>
             <h2>태그 검색</h2>


             <div className={"row"}>
                <div className={"col-2"} style={{height: "640px", overflowY: "auto"}}>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>필터</h4>
                         <button className={"btn btn-primary"} onClick={clearAll}>전체 초기화</button>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                   <Form.Check type={type} id={`default-${type}`} label={`감상가능한 작품보기`}/>
                                   <Form.Check type={type} id={`default-${type}`} label={`멤버십 포함된 작품보기`}/>
                                </div>
                            ))}
                         </Form>
                      </div>
                   </div>
                   <hr/>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>장르</h4>

                         <button className={"btn btn-primary"} onClick={toggleModal}> 더보기

                         </button>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['개그', '드라마', '모험', '공포', '범죄'].map((genre) => (
                                <div key={genre} className="mb-3">
                                   <CheckBoxCustom
                                       text={genre}
                                       checked={checkedItems[genre] || false}
                                       onChange={() => handleCheckboxGenres(genre)}
                                   />
                                </div>

                            ))}
                         </Form>
                      </div>
                   </div>
                   <hr/>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>태그</h4>
                         <button className={"btn btn-primary"} onClick={() => setModalTagsOpen(true)}> 더보기
                         </button>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['가족', '감동', '게임', '동물', '동양풍'].map((tags) => (
                                <div key={tags} className="mb-3">
                                   <CheckBoxCustom
                                       text={tags}
                                       checked={checkedItems[tags] || false}
                                       onChange={() => {
                                          handleCheckboxTags(tags);
                                       }}
                                   />
                                </div>
                            ))}
                         </Form>
                      </div>
                   </div>
                   <hr/>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>년도</h4>
                         <button className={"btn btn-primary"} onClick={() => setModalYearsOpen(true)}>더보기</button>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['2024년 1분기', '2023년 2분기', '2022년', '2021년', '2020년'].map(label => (
                                <div key={label} className="mb-3">
                                   <Form.Check
                                       type="checkbox"
                                       id={`default-checkbox-${label}`}
                                       label={label}
                                       checked={years.includes(label)}
                                       onChange={(e) => handleyearsChange(label, e.target.checked)}
                                   />
                                </div>
                            ))}
                         </Form>
                      </div>
                   </div>
                   <hr/>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>방영</h4>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                   <Form.Check type={type} id={`default-${type}`} label={`방영중`}/>
                                   <Form.Check type={type} id={`default-${type}`} label={`완결`}/>
                                </div>
                            ))}
                         </Form>
                      </div>
                   </div>
                   <hr/>
                   <div>
                      <div className={"d-flex justify-content-between mt-5"}>
                         <h4>출시타입</h4>
                      </div>
                      <hr/>
                      <div className={"p-3"}>
                         <Form>
                            {['checkbox'].map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                   <Form.Check type={type} id={`default-${type}`} label={`TVA`}/>
                                   <Form.Check type={type} id={`default-${type}`} label={`극장판`}/>
                                   <Form.Check type={type} id={`default-${type}`} label={`OVA`}/>
                                </div>
                            ))}
                         </Form>
                      </div>
                   </div>
                </div>


                <Modal size='lg' show={isModalOpen} onClose={toggleModal} className={modalStyle.container}>
                   <div className={"p-3"}>
                      <h2 className={"text-center"}>장르 전체</h2>
                      <p className={"text-center"}>원치 않는 필터는 체크 박스를 한번 더 누르면 제외할 수 있어요.</p>

                      <Form>
                         <div className="row ps-3" style={{height: "400px"}}>
                            {['BL', '공포', '무협', '스릴러', '아이돌', '음악', '추리', '하렘', 'GL 백합', '드라마', '미스터리', '스포츠', '악역영애', '이세계', '치유', 'SF', '로맨스', '범죄', '시대물', '액션', '일상', '특촬', '개그', '모험', '성인', '아동', '음식', '재난', '판타지'].map((genre, index) => (
                                <div className="col-md-3 mb-3" key={genre}>
                                   <CheckBoxCustom
                                       text={genre}
                                       checked={checkedItems[genre] || false}
                                       onChange={() => handleCheckboxGenres(genre)}
                                   />
                                </div>
                                /* 주석을 사용하려면 이렇게 해야 합니다. */
                                /* {((index + 1) % 4 === 0) && <div className="w-100"></div>} */
                            ))}
                         </div>

                      </Form>
                      <div className={"d-flex justify-content-end"}>
                         <div className="reset-container mt-2">
                            <IoReloadOutline className="icon-style"/>
                            <span className="mt-2 me-3">전체초기화</span>
                         </div>
                         <button className={"btn btn-primary mb-3 me-3"} onClick={toggleModal}>확인</button>
                      </div>
                   </div>
                </Modal>


                <Modal
                    size='lg'
                    show={modalTagsOpen}

                    className={modalStyle.container}
                    contentLabel="Example Modal"
                >
                   <div className={"p-3"}>
                      <h2 className={"text-center"}>태그 전체</h2>
                      <p className={"text-center"}>원치 않는 필터는 체크 박스를 한번 더 누르면 제외할 수 있어요.</p>
                      <Form>
                         <div className="row ps-3" style={{height: "400px"}}>
                            {['가족', '동양풍', '마법소녀', '선생님', '뱀파이어', '시간여행', '오타쿠', '좀비'
                               , '퇴마', '감동', '두뇌싸움', '먼치킨', '복수', '성별전환', '역하렘',
                               '학교', '게임', '로봇', '무거움', '삼각관계', '성장', '연예인', '육아', '짝사랑'
                               , '동물', '루프물', '배틀', '서양풍', '슬픔', '열혈', '정치', '철학'].map((tags, index) => (
                                <div className="col-md-3 mb-3" key={tags}>
                                   <CheckBoxCustom
                                       text={tags}
                                       checked={checkedItems[tags] || false}
                                       onChange={() => handleCheckboxTags(tags)}
                                   />
                                </div>
                                /* 주석을 사용하려면 이렇게 해야 합니다. */
                                /* {((index + 1) % 4 === 0) && <div className="w-100"></div>} */
                            ))}
                         </div>

                      </Form>
                      <div className={"d-flex justify-content-end"}>

                         <div className="reset-container mt-2">
                            <IoReloadOutline className="icon-style"/>
                            <span className="mt-2 me-3">전체초기화</span>
                         </div>

                         <button className={"btn btn-primary mb-3 me-3"} onClick={() => setModalTagsOpen(false)}>적용
                         </button>

                      </div>
                   </div>
                </Modal>


                {/*years 모달창임*/}
                <Modal
                    style={{top: '200px'}}
                    show={modalYearsOpen}
                    size="lg"


                >
                   <div className={"p-3"}>
                      <h2 className={"text-center"}>년도 전체</h2>
                      <Form>
                         <div className="row ps-3" style={{height: "500px"}}>
                            {['2024년 2분기', '2024년 1분기', '2023년 4분기', '2023년 3분기',
                               '2023년 2분기', '2023년 1분기', '2022년', '2021년', '2020년'
                               , '2019년', '2018년', '2017년', '2016년', '2015년', '2014년', '2013년'
                               , '2012년', '2011년', '2010년', '2000년대', '2000년대 이전'].map(label => (
                                <div key={label} className="col-md-3 mt-3">
                                   <Form.Check
                                       type="checkbox"
                                       id={`default-checkbox-${label}`}
                                       label={label}
                                       checked={years.includes(label)}
                                       onChange={(e) => handleyearsChange(label, e.target.checked)}
                                   />
                                </div>
                            ))}
                         </div>
                      </Form>
                      <div className={"d-flex justify-content-end"}>

                         <div className="reset-container mt-2">
                            <IoReloadOutline className="icon-style"/>
                            <span className="mt-2 me-3">전체초기화</span>
                         </div>

                         <button className={"btn btn-primary mb-3 me-3"} onClick={() => setModalYearsOpen(false)}>적용
                         </button>

                      </div>
                   </div>
                </Modal>

                <div className={"col"} style={{height: "640px", overflowY: "auto"}} ref={DivRef}>
                   <p className={"mt-5"}>총 {count}개의 작품이 검색되었어요!</p>
                   <p>선택된 필터</p>
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
                   <div className={gridImg.container}>
                      <div className="row">
                         {searchItem.map((item, index) => {
                            const imageUrl = item.images.length > 1 ? item.images[1].img_url : item.images[0].img_url; // images[1]이 있으면 그것을 사용하고, 없으면 images[0]을 사용
                            return (
                                <Link to={`/Detail`} state={{item: item.id}} key={index}
                                      className="col-md-3 pb-3 text-black text-decoration-none">
                                   <div>
                                      <img src={imageUrl} alt={item.name} className={gridImg.keyImg}/>
                                      <p>{item.name}</p>
                                   </div>
                                </Link>

                            )
                         })}
                      </div>
                   </div>

                </div>


             </div>
          </div>
       </div>
   );
}

export default Finder;

