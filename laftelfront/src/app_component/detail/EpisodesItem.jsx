import React from 'react';

const EpisodesItem = ({ episode_num, thumbnail_path, subject, published_datetime }) => {
    return (
        <div style={{ borderBottom: '1px solid #ccc', paddingTop: '15px', paddingBottom: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginRight: '12px'}}>
                <img src={thumbnail_path} alt="" style={{ width: '150px', height: 'auto' }} />
            </div>
            <div style={{ textAlign: 'left', width: "200px" }}>
                {episode_num && <h4 className={"fw-bold"} style={{ fontSize: '13px', margin: '0' }}>{episode_num}화 {subject}</h4>}
                {published_datetime && <p style={{ fontSize: '13px', margin: '0' }}>등록날짜: {published_datetime}</p>}
            </div>
        </div>
    );
}


export default EpisodesItem;
