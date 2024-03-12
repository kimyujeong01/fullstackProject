import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function SimilarAni(props) {
    const similarAni = props.simAni;

    return (
        <div>
            <h4>비슷한 컨텐츠</h4>
            <div className={"row row-cols-5"}>
                {
                    similarAni.map(item => {
                        return (
                            <Link className={"col text-decoration-none"} to={`/Detail`} state={{item: item.id}}>
                                <div className="card p-2 border-0">
                                    <img src={item.img} style={{height: "30vh", objectFit: "cover"}}
                                         className="card-img-top" alt="..."/>
                                    <h5 className="card-title text-truncate">{item.name}</h5>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SimilarAni;