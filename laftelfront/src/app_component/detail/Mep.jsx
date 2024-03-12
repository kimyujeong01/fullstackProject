import React, {useEffect, useState} from "react";
import axios from "axios";
import EpisodesItem from "./EpisodesItem";
import {useLocation} from "react-router-dom";

function Mep(props) {
    const location = useLocation();
    const itemId = location.state?.item;
    const [episodes, setEpisodes] = useState([]);
    const [episodeCount, setEpisodeCount] = useState(0);

    useEffect(() => {

    axios.get(`api/episodes/v2/list/?item_id=${itemId}&sort=newest&limit=1000&show_playback_offset=true&offset=0`)
        .then(res => {
            const data = res.data;
            if (Array.isArray(data.results)) {
                const sortedEpisodes = data.results.sort((a, b) => a.episode_num - b.episode_num);
                const formattedEpisodes = sortedEpisodes.map(episode => ({
                    ...episode,
                    published_datetime: new Date(episode.published_datetime).toISOString().slice(0, 10)
                }));
                setEpisodes(formattedEpisodes);
                setEpisodeCount(formattedEpisodes.length);
            } else {
                console.log(data);
            }
        })
        .catch(err => {
            console.log('에러 발생:', err);
        });
}, []);
    return (
        <div>
            <h5 style={{
                marginTop: '20px',
                textAlign: 'left',
                fontSize: '18px'
            }}>총 {episodeCount}화</h5>

            <div>
                {episodes.length > 0 ? (
                    episodes.map((episode, index) => (
                        <EpisodesItem
                            key={index}
                            episode_num={episode.episode_num}
                            thumbnail_path={episode.thumbnail_path}
                            published_datetime={episode.published_datetime}
                            subject={episode.subject}
                        />
                    ))
                ) : (
                    <p>에피소드 데이터를 불러오는 중입니다...</p>
                )}
            </div>
        </div>
    );
}

export default Mep;
