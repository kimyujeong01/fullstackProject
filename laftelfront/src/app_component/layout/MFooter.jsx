import React from "react";
import { FaTiktok, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function MFooter(props) {
  return (
      <div >
        <footer style={{ backgroundColor: '#191B2A', color: 'white', textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <a href="#" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.5em' }}>LAFTEL PEDIA</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginBottom: '10px' }}  state={{ linkNum: "link0" , tabNum: 0 }}>팀원소개</Link>
            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginBottom: '10px' }}  state={{ linkNum: "link1" , tabNum: 1 }}>이용약관</Link>
            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginBottom: '10px' }}  state={{ linkNum: "link2" , tabNum: 2}}>청소년보호정책</Link>
            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none', marginBottom: '10px' }}  state={{ linkNum: "link3" , tabNum: 3 }}>개인정보 처리방침</Link>
            <Link style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}  state={{ linkNum: "link4" , tabNum: 4 }}>저작권 표기</Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="https://www.tiktok.com/@laftel_official" className="icon-link" target={"_blank"} style={{ marginRight: '15px' }}>
              <FaTiktok size="20" color="white"/>
            </a>
            <a href="https://twitter.com/laftel_net" className="icon-link" target={"_blank"} style={{ marginRight: '15px' }}>
              <FaTwitter size="20" color="white"/>
            </a>
            <a href="https://vo.la/7wPfY" className="icon-link" target={"_blank"}>
              <FaYoutube size="20" color="white"/>
            </a>
          </div>
        </footer>
      </div>
  );
}

export default MFooter;