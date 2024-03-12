import React, {useEffect, useState} from "react";
import axios from "axios";

function ListView(props) {
    const [episodeData, setEpisodeData] = useState(null);
    const itemId = props.itemId;

    useEffect(() => {
        let now = new Date();
        axios.get(`/api/episodes/v2/list/?item_id=${itemId}`)
            .then(res => {

                const {data} = res;
                setEpisodeData(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);

    return (
        <div>
            <h4>작품 회차</h4>
            <div>
                {/* 총 에피소드 수 표시 */}
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'right',
                    marginRight: '30px'
                }}>
                    {`총 ${episodeData && episodeData.results.length}회`}
                </h1>

                {/* 에피소드 데이터가 있을 경우 리스트 표시 */}
                {episodeData && (
                    <div style={{overflowY: 'auto', maxHeight: '500px'}}>
                        {/* 각 에피소드 정보 매핑 및 표시 */}
                        {episodeData.results.map((episode) => (
                            <div>
                                <div key={episode.id} style={{display: 'flex'}}>
                                    {/* 왼쪽에 썸네일 이미지 */}

                                    <div style={{width: '160px', height: '100px', marginRight: '20px', marginTop: '3px'}}>
                                        <img
                                            src={episode.thumbnail_path}
                                            alt={`에피소드 ${episode.episode_num}의 썸네일`}
                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                        />
                                    </div>

                                    {/* 오른쪽에 제목, 에피소드 번호, 내용 */}
                                    <div className={"p-2"} style={{flex: '1', display: 'flex', flexDirection: 'column'}}>
                                        {/* 에피소드 번호와 제목을 같은 줄에 표시 */}
                                        <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '5px'}}>
                                            {`${episode.episode_num}화 ${episode.subject}`}
                                        </div>

                                        {/* 에피소드 내용 */}
                                        <div style={{
                                            fontSize: '16px',
                                            maxHeight: '2.8em',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: '5px',
                                        }}>
                                            {episode.description}
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default ListView;