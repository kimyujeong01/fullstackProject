import React, {useEffect, useState} from "react";
import axios from "axios";
import text from "../../css/mobile/text.module.css";
import {Link} from "react-router-dom";

function AppView(props) {
   const data = sessionStorage.getItem('userId');
   const username = JSON.parse(data);
   const userInfo = {userId: username}
   const [aniInfo, setAniInfo] = useState([]);

   useEffect(() => {
      axios.post('/mypage/view', userInfo)
         .then(res => {
            setAniInfo(res.data.result);
         })
         .catch(err => {
            console.log(err);
         })

   }, []);

   return (
      <div  className={"p-4"}>
         {
            aniInfo.length > 0 ?
               (
                  <div className={"row row-cols-2"}>
                     {
                        aniInfo.map(item => {
                           return (
                              <Link className={"text-decoration-none"} to={`/Detail`} state={{item: item.aniIdx}} key={item.aniIdx}>
                                 <div className="card p-2 border-0">
                                    <img
                                       src={item.aniImgUrl}
                                       className="card-img-top"
                                       alt={item.aniTitle}
                                       style={{width: '100%', height: '20vh'}}
                                    />
                                    <p className={`card-title ${text.multiLineEllipsis}`}>{item.aniTitle}</p>
                                 </div>
                              </Link>
                           )
                        })
                     }
                  </div>
               )
               :
               (
                  <div style={{opacity: "0.4",textAlign:"center"}}>
                     <img src={'/image/MyPageLogo.png'} alt={""}
                          style={{width: '100%', height: '40vh'}}/>
                     <p>저장된 보고싶다가 없습니다.</p>
                  </div>
               )

         }
      </div>
   );
}

export default AppView;