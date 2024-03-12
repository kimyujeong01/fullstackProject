import {useEffect, useState} from "react";
import axios from "axios";

function SimilarList({itemId}) {
    const [similarList, setSimilarList] = useState([]);

    useEffect(() => {
        const itemId = "41841";
        const fetchSimilarItems = async (itemId) => {
            try {
                // 작품 상세 정보 가져오기
                const itemDetailResponse = await axios.get(`api/v1.0/items/${itemId}/detail/`);
                const itemData = itemDetailResponse.data;

                if (itemData) {
                    const relatedItem = itemData.related_item;
                    const formattedData = [];
                    for (let i = 0; i < relatedItem.length; i += 2) {
                        formattedData.push(relatedItem.slice(i, i + 2));
                    }
                    setSimilarList(formattedData);
                }
            } catch (error) {
                console.log("Error fetching item detail:", error);
            }
        };


        fetchSimilarItems(itemId);
    }, [itemId]);


    return (
        <div className="row mt-4">
            {(similarList).map((items, index) => (
                <div key={index} className="col-md-10 mb-4">
                    <div className="d-flex flex-wrap">
                        {items.map((item, subIndex) => (
                            <div key={subIndex} className="card p-2 border rounded d-flex flex-column mb-3 "
                                 style={{width: '48%'}}>
                                <img src={item.img} className="card-img-top" alt="..."
                                     style={{width: '100%', height: '60%'}}/>
                                <div className="card-body text-center">
                                    <h5 className="card-title"
                                        style={{
                                            fontSize: '15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            whiteSpace: item.name.length > 10 ? 'normal' : 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {item.name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
        ;
}

export default SimilarList;
