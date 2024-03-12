import React from "react";
import Similar from "./Similar";
import Review from "./Review";
import Mep from "./Mep";

function MTabContent(props) {
   if (props.tab === 0) {
      return (
          // <div style={{ marginRight: '20px' }}>
             <Mep />
          // </div>
      );
   }
   if (props.tab === 1) {
      return (
      <Similar />
      );
   }
   if (props.tab === 2) {
      return (
          <div style={{ marginTop: "30px" }}>
             <Review />
          </div>
      );
   }
}

export default MTabContent;