import React, {useEffect, useState} from "react";
import ComListModal from "../../component/detail/ModalCollection/ComListModal";
import axios from "axios";
import StarShape from "../../component/shape/StarShape";

function MbComment(props) {
    const itemId = props.itemId;
    const [ment, setMent] = useState([]);
    const [btnOnOff, setBtnOnOff] = useState(false);
    const [displayedMent, setDisplayedMent] = useState([]);
    const [postData, setPostData] = useState({aniIdx: ''});


    const comBtnClick = () => {
        setBtnOnOff(true);
    };

    useEffect(() => {
        // post data 내부의 aniIdx를 props.itemId 가 최신 값으로 업데이트합니다.
        setPostData({aniIdx: itemId});
    }, [itemId]);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`/api/reviews/v2/list/?item_id=${itemId}`)
            .then((res) => {
                const {results} = res.data;
                setMent(prevState => [...prevState, ...results]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [itemId]);


    useEffect(() => {
        axios.post(`/aniDetail/comment`, postData)
            .then(res => {
                const result = res.data;
                setMent(prevState => [...prevState, ...result]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [postData]);

    return (
        <div>
            <h4>코멘트</h4>
            <div>
                {
                    ment.map((item, index) => {
                        return (
                            <div className={"border-bottom"} key={index}>
                                <div>
                                    <div className={"d-flex justify-content-between"}>
                                        <div className={"mt-2"}>
                                            <img
                                                src={item.profile?.image ? item.profile.image : 'https://image.laftel.net/profiles/default/68beb046-ac03-4f5a-868f-42cd4074037f.jpg'}
                                                className="rounded-circle me-2" style={{width: "30px", height: "30px"}}
                                                alt="..."/>
                                            <span className="card-title">{item.profile.name.replace(/\(.*\)/, '')}</span>
                                        </div>
                                        <div>
                                            <StarShape rating={item.score}></StarShape>
                                        </div>

                                    </div>
                                </div>
                                <p className={"mt-2"}>{item.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MbComment;