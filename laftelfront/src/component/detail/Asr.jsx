import React, {useEffect, useState} from "react";
import axios from "axios";

function Asr(props) {
   const itemId = props.itemId;
   const [asr , setAsr] = useState();

   useEffect(() => {
      window.scrollTo(0,0);
      let now = new Date();
      axios.get(`/api/items/v1/${itemId}/statistics/`)
         .then(res => {
            const {data} = res;
            setAsr(data.average_score);
         })
         .catch(err => {
            console.log(err);
         });
   }, [itemId]);

   return (
      <div>
         <h2 className={"mt-2"}>{asr}</h2>
         <span>라프텔 평균 별점</span>
      </div>
   );
}

export default Asr;