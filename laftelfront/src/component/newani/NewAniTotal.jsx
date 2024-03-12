import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Header2 from "../layout/Header2";
import Footer from "../layout/Footer";

function NewAniTotal(props) {
   // 주간 데이터를 저장할 state
   const [weeklyData, setWeeklyData] = useState({월요일: [], 화요일: [], 수요일: [], 목요일: [], 금요일: [], 토요일: [], 일요일: [],});
   // 컴포넌트가 마운트될 때 API에서 데이터 가져오기
   const [dayOfWeek, setDayOfWeek] = useState();
   const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

   // 개별 카드의 스타일
   const cardStyle = {
      padding: '5px',
      marginBottom: '10px',
      width: '200px',  // 고정된 너비
      height: '350px',  // 고정된 높이
      textAlign: 'center',
      margin: '0 auto',  // 센터 정렬
      minWidth: '200px', // 최소 너비 추가
   };
   const imageStyle = {
      width: '100%',  // 이미지를 카드 너비에 맞추기
      height: '80%',  // 높이 자동 조절
      borderRadius: '5px',
   };

   useEffect(() => {
      let now = new Date();
      axios.get(`/api/search/v2/daily/`)
         .then(res => {
            const {data} = res;
            const groupedData = groupDataByDay(data);
            setWeeklyData(groupedData);
         })
         .catch(err => {
            console.log(err);
         });
      setDayOfWeek(week[now.getDay()]);
   }, []);

   // 데이터를 요일별로 그룹화하는 함수
   const groupDataByDay = (data) => {
      const groupedData = {
         월요일: [],
         화요일: [],
         수요일: [],
         목요일: [],
         금요일: [],
         토요일: [],
         일요일: [],
      };

      data.forEach((item) => {
         let day = item.distributed_air_time;
         // 이미 한글로 제공되므로 변환 없이 사용
         groupedData[day].push(item);
      });

      return groupedData;
   };


   return (
       <div>
       <Header2/>
      <div style={{padding: '50px', textAlign: 'center'}}>

         <h2 className={'mt-3'}>요일별 신작</h2>

         <div style={{margin: '0 auto', maxWidth: '1600px'}}>
            <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
               {Object.keys(weeklyData).map((day) => (
                  <div key={day} style={{
                     backgroundColor: day === dayOfWeek ? 'rgba(163, 102, 255, 0.2)' : 'transparent',
                     color: day === dayOfWeek ? 'purple' : 'black',
                     margin: '5px',
                  }}>

                     {/* 요일명 표시 */}
                     <h4 style={{marginTop: '15px'}}>{day}</h4>

                     {/* 해당 요일의 각 아이템을 카드로 표시 */}
                     {weeklyData[day].map((item, index) => (
                        <div key={index} style={cardStyle}>

                           {/* 아이템 이미지를 이용해 디테일 페이지로 이동하는 링크 */}
                           <Link to={`/Detail`} state={{item: item.id}} className={"text-decoration-none"}>

                              {/* 아이템 이미지 표시 */}
                              <img
                                 src={item.img}
                                 style={imageStyle}
                                 alt={item.name}
                              />
                              {/* 아이템 이름 표시 */}
                              <p
                                 style={{
                                    marginTop: '15px',
                                    marginLeft: '13px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '150px',
                                    color: 'black',
                                 }}
                              >
                                 {item.name}
                              </p>
                           </Link>
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </div>
          <Footer/>
       </div>
   );
}

export default NewAniTotal;