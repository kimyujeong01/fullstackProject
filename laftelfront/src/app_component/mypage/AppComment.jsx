import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentUpdate from "./mypageModal/CommentUpdate";
import CommentDeletes from "./mypageModal/CommentDeletes";
import StarShape from "../../component/shape/StarShape";

function AppComment(props) {
   const data = sessionStorage.getItem('userId');
   const username = JSON.parse(data);
   const userInfo = { userId: username }
   const [aniInfo, setAniInfo] = useState([]);
   const [update,setUpdate] = useState("");
   const [deletes,setDeletes] = useState("");
   const [aniIdx , setAniIdx] = useState("");
   const [aniTitle , setAniTitle] = useState("");

   useEffect(() => {
      axios.post('/mypage/review', userInfo)
         .then(res => {
            setAniInfo(res.data.result);
         })
         .catch(err => {
            console.log(err);
         });
   }, []);

   useEffect(() => {
      const fetchAniTitles = async () => {
         const promises = aniInfo.map(item => {
            return axios.get(`/api/v1.0/items/${item.aniIdx}/detail/`)
               .then(res => {
                  return { ...item, title: res.data.name };
               })
               .catch(err => {
                  console.log(err);
                  return { ...item, title: "제목을 불러오지 못했습니다" };
               });
         });
         const result = await Promise.all(promises);
         setAniInfo(result);
      };

      if (aniInfo.length > 0) {
         fetchAniTitles();
      }
   }, [aniInfo]);

   const updateButton = (e, title) => {
      setAniIdx(e.target.value);
      setAniTitle(title);
      setUpdate(true);
   }

   const deletesButton = (e, title) => {
      setAniIdx(e.target.value);
      setAniTitle(title);
      setDeletes(true);
   }

   return (
      <div>
         <CommentUpdate show={update} onHide={()=>setUpdate(false)} itemId = {aniIdx} userId = {username} title={aniTitle} />
         <CommentDeletes show={deletes} onHide={()=>setDeletes(false)} itemId = {aniIdx} userId = {username} title={aniTitle}  />

         {
            aniInfo.length > 0 ?
               (
                  <div>
                     {
                        aniInfo.map((item,index) => {
                           return (
                              <div className={"border-bottom p-2"} key={index}>
                                 <h6 className={"text-truncate"}>{item.title}</h6>
                                 <StarShape rating={item.starRating} ></StarShape>
                                 <span>{item.content}</span><br/>
                                 <div className={"d-flex justify-content-end"}>
                                    <button className={"text-white text-decoration-none me-2 border-0 rounded-2"} style={{backgroundColor:"green"}} onClick={(e) => updateButton(e, item.title)}
                                            value={item.aniIdx}>수정</button>
                                    <button className={"text-white text-decoration-none border-0 rounded-2"} style={{backgroundColor:"red"}} onClick={(e) => deletesButton(e, item.title)}
                                            value={item.aniIdx}>삭제</button>
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               )
               :
               (
                  <div style={{opacity: "0.4", textAlign: "center"}}>
                     <img src={'/image/MyPageLogo.png'} alt={""}
                          style={{width: '100%', height: '40vh'}}/>
                     <p>저장된 코멘트가 없습니다.</p>
                  </div>
               )
         }
      </div>
   );
}

export default AppComment;