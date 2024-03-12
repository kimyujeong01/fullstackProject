import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import text  from "../../css/mobile/text.module.css";

import {Link} from "react-router-dom";

axios.defaults.withCredentials = true;



function MNewAni(props) {
   const [animeList, setAnimeList] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState();
  const [selectedDay, setSelectedDay] = useState('');
  const week = ['일', '월', '화', '수', '목', '금', '토'];
    var settings = {
        infinite: true,
        speed: 100,
        slidesToShow: 3, // 한 줄에 아이템 2개가 보이도록 설정
        slidesToScroll: 2,
        initialSlide: 0
    };

  useEffect(() => {
    const now = new Date(); // 현재 날짜
    const currentDay = now.getDay(); // 오늘의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    setSelectedDay(week[currentDay]); // 현재 요일 설정
    fetchData(week[currentDay]); // 현재 요일 데이터 가져오기
  }, []);

  // 선택된 요일에 따라 데이터를 가져오는 함수
  const fetchData = (day) => {
    axios.get('api/search/v2/daily/')
        .then((res) => {
          const filteredData = res.data.filter((item) => item.distributed_air_time.includes(day));
          // 최대 2개씩 데이터를 묶어서 저장
          const formattedData = [];
          for (let i = 0; i < filteredData.length; i += 1) {
            formattedData.push(filteredData.slice(i, i + 1));
          }
          setAnimeList(formattedData);
        })
        .catch((err) => {

        });
  };

  // 요일 버튼 클릭 시 실행되는 함수
  const handleDayClick = (day) => {
    setSelectedDay(day);
    fetchData(day);
  };

  return (
      <div className="container mt-5">
          <p className="fw-bold" style={{textAlign: 'left', marginLeft: '5px', fontSize: '20px'}}>요일별 신작</p>


          <div className="d-flex gap-4 justify-content-center">
              {week.map((day) => (
                  <button
                      key={day}
                      className="btn btn-sm rounded-circle fw-bold"
                      style={{
                          backgroundColor: day === selectedDay ? '#816BFF' : '#D0D0D0',
                          color: 'white',
                          width: '30px',
                          height: '30px',
                          fontSize: '10px'
                      }}
                      type="button"
                      onClick={() => handleDayClick(day)}
                  >
                      {day}
                  </button>
              ))}
          </div>


          <div className={"row mt-2"}>

              <Slider {...settings}>
                  {animeList.map((animeGroup, index) => (
                      <div key={`animeGroup-${index}`}>
                          {animeGroup.map((item) => (
                              <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.id}}>
                                  <div className="card p-2 border-0">
                                      <img
                                          src={item.img}
                                          className="card-img-top"
                                          alt={item.name}
                                          style={{width: '100%', height: '20vh'}}
                                      />
                                      <h5 className={`card-title ${text.multiLineEllipsis}`}>{item.name}</h5>
                                  </div>
                              </Link>
                          ))}
                      </div>
                  ))}
              </Slider>
          </div>

      </div>
  )
      ;
}

export default MNewAni;