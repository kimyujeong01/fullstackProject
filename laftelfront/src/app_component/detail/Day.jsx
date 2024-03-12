import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Day() {
    const [animeList, setAnimeList] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const week = ['일', '월', '화', '수', '목', '금', '토'];

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
                for (let i = 0; i < filteredData.length; i += 2) {
                    formattedData.push(filteredData.slice(i, i + 2));
                }
                setAnimeList(formattedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 요일 버튼 클릭 시 실행되는 함수
    const handleDayClick = (day) => {
        setSelectedDay(day);
        fetchData(day);
    };

    return (
        <div className="container mt-5">
            <p className="fw-bold fs-2" style={{textAlign: 'center', marginLeft: '-5px'}}>요일별 신작</p>


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

            <div className="row mt-2">
            {animeList.map((items, index) => (
                    <div key={index} className="col-md-12 mb-2">
                        <div className="d-flex flex-wrap">
                            {items.map((item, i) => (
                                <div key={i} className="card p-2 border-1 d-flex flex-column m-3" style={{ width: '40%' }}>
                                    <img src={item.img} className="card-img-top" alt="..." style={{ width: '100%', height: 'auto' }} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{item.name}</h5>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Day;
