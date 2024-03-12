import React, {useEffect, useState} from "react";
import axios, {post} from "axios";

import ComListModal from "./ModalCollection/ComListModal";
import StarShape from "../shape/StarShape";

function Comment(props) {
    const itemId = props.itemId;
    const [ment , setMent] = useState([]);
    const [btnOnOff , setBtnOnOff] = useState(false);
    const comBtnClick = (e) => {
        setBtnOnOff(true);
    }



    useEffect(() => {
        window.scrollTo(0,0);

        axios.get(`/api/reviews/v2/list/?item_id=${itemId}`)
            .then(res => {
                const {results} = res.data;


                setMent(prevState => [...prevState, ...results]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);



    useEffect(()=>{
        const postData = {
            aniIdx: itemId
        };


        axios.post(`/aniDetail/comment` ,postData)
            .then(res => {
                const result = res.data;
                console.log(postData);

                setMent(prevState => [...prevState, ...result]);


            })
            .catch(err => {
                console.log(err);
            });
    }, [itemId]);

    return (
        <div>
            <ComListModal show={btnOnOff} onHide={()=>setBtnOnOff(false)} results={ment} />
            <div className="d-flex justify-content-between">
                <h4>코멘트</h4>
                <button className={"btn btn-primary"} onClick={comBtnClick}>더보기</button>
            </div>

            <div>
                <div className={"row row-cols-4"}>
                    {
                        ment.map((item,index) => {
                            if (index <= 7){
                                return (
                                    <div className="col mt-2">
                                        <div className="card overflow-hidden">
                                            <div className="card-body" style={{height: "200px"}}>
                                                <img src={item.profile?.image ? item.profile.image : 'https://image.laftel.net/profiles/default/68beb046-ac03-4f5a-868f-42cd4074037f.jpg'}
                                                     className="rounded-circle me-2" style={{width: "30px", height: "30px"}} alt="..."/>

                                                <span
                                                    className="card-title">{item.profile?.name.replace(/\(.*\)/, '')}</span>
                                                <StarShape rating={item.score}></StarShape>
                                                <hr/>
                                                <p className="card-text" style={{height: "100%", overflow: "hidden"}}>
                                                    {item.content.length > 100 ? `${item.content.substring(0, 100)}...` : item.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Comment;