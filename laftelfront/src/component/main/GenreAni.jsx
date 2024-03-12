import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import arrowStyle from "../../css/Arrow.module.css";
import {ReactComponent as NavArrowLeftIcon} from "../../css/assets/svg/leftArrow.svg";
import {ReactComponent as NavArrowRightIcon} from "../../css/assets/svg/rightArrow.svg";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function getRandomItems(items, num) {
  // Fisher-Yates shuffle 알고리즘을 사용하여 배열을 무작위로 섞습니다.
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  // 무작위로 섞인 배열에서 처음 num개의 요소를 반환합니다.
  return items.slice(0, num);
}
function NextArrow(props) {
  const {isHovered, onClick, index} = props;

  return (
      <div
          className={`${arrowStyle.arrow} ${isHovered ? arrowStyle.hovered : ''}`}
          onClick={onClick}
          // onMouseEnter 및 onMouseLeave 이벤트를 여기서 처리할 필요가 없습니다.
      >
        <NavArrowRightIcon />
      </div>
  );
}

function PrevArrow(props) {
  const {isHovered, onClick, index} = props;

  return (
      <div
          className={`${arrowStyle.arrow} ${isHovered ? arrowStyle.hovered : ''}`}
          onClick={onClick}
          // onMouseEnter 및 onMouseLeave 이벤트를 여기서 처리할 필요가 없습니다.
      >
        <NavArrowLeftIcon />
      </div>
  );
}
function GenreAni(props) {
  const [genres, setGenres] = useState([]);
  // 결과를 저장할 상태를 추가합니다.
  const [aniItems, setAniItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [hoverStates, setHoverStates] = useState([]);

  var settings = {
    infinite: false,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 0,
       initialSlide: 0
  };
  useEffect(() => {
    // genres 배열이 변경될 때 hoverStates를 재설정합니다.
    setHoverStates(new Array(genres.length).fill(false));
  }, [genres]);



  useEffect(() => {
    const data = sessionStorage.getItem('userInfo');
    if (data) {
      const userInfo = JSON.parse(data);
      if (userInfo && userInfo.genre) {
        setGenres(userInfo.genre.split(","));
      }
    }
  }, []);

  useEffect(() => {
    // genres 배열에 값이 있을 때만 요청을 수행합니다.
    if (genres.length > 0) {
      // 장르 별로 axios 요청 Promise를 생성합니다.
      const requests = genres.map(genre =>
          axios.get(`api/search/v1/discover/?sort=rank&genres=${genre}&viewable=true&offset=0&size=200`)
      );

      // 생성된 모든 Promise가 완료될 때까지 기다린 후, 결과를 처리합니다.
      Promise.all(requests)
          .then(responses => {
            // responses는 axios 응답 객체의 배열입니다.
            // 여기서 필요한 데이터만 추출하여 상태에 저장합니다.
            const items = responses.map(response => getRandomItems(response.data.results, 5));
            setAniItems(items);
              console.log(items);

          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [genres]); // genres 배열이 변경될 때마다 이 효과를 실행합니다.

  return (
      <div className={'container mt-5'}>

        {aniItems.map((itemList, index) => (

            <div key={index} >
              <h2 className="genre-title">{genres[index]}</h2>

              <Slider {...settings}>
                {itemList.map((item, index) => (
                    <div key={index}            onMouseEnter={() => setIsHovered(true)}
                         onMouseLeave={() => setIsHovered(false)}>

                      <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.id}}>
                        <div className="card p-2 border-0">
                          <img src={item.img} style={{height: "25vh", objectFit: "cover"}}
                               className="card-img-top" alt="..."/>
                          <h5 className="card-title ">{item.name}</h5>
                        </div>
                      </Link>


                    </div>
                ))}
              </Slider>


            </div>
        ))}
      </div>
  );
}

export default GenreAni;