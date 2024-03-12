import React from "react";
import {FaTiktok} from "react-icons/fa";
import {FaYoutube} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {Link} from "react-router-dom";


function Footer(props) {
    return (
        <div className={'text-container'}>
            <footer className={'container-fluid border-top p-5'} style={{backgroundColor: '#191B2A'}}>
                <p className={'lead text-left'}
                   style={{float: 'left', marginRight: '20px', marginTop: '-20px', fontSize: '35px'}}>
                    <a href="#" style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}}>LAFTEL PEDIA</a>
                </p>
                <p className={'lead text-left'}
                   style={{float: 'left', marginLeft: '40px', marginRight: '50px', fontSize: '15px'}}>
                    <Link style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}} to={'/Other'} state={{ linkNum: "link0" , tabNum: 0 }}>팀원소개</Link>
                </p>
                <p className={'lead text-left'} style={{float: 'left', marginRight: '50px', fontSize: '15px'}}>
                    <Link style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}} to={'/Other'} state={{ linkNum: "link1" , tabNum: 1 }}>이용약관</Link>
                </p>
                <p className={'lead text-left'} style={{float: 'left', marginRight: '50px', fontSize: '15px'}}>
                    <Link style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}} to={'/Other'} state={{ linkNum: "link2" , tabNum: 2}}>청소년보호정책</Link>
                </p>
                <p className={'lead text-left'} style={{float: 'left', marginRight: '50px', fontSize: '15px'}}>
                    <Link style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}} to={'/Other'} state={{ linkNum: "link3" , tabNum: 3 }}>개인정보 처리방침</Link>
                </p>
                <p className={'lead text-left'} style={{float: 'left', marginRight: '50px', fontSize: '15px'}}>
                    <Link style={{color: 'white', fontWeight: 'bold', textDecoration: 'none'}} to={'/Other'} state={{ linkNum: "link4" , tabNum: 4 }}>저작권 표기</Link>
                </p>

                <a href="https://www.tiktok.com/@laftel_official" className="icon-link" target={"_blank"}
                   style={{marginRight: '25px', float: 'right',}}>
                    <FaTiktok size="20" color="white"/>
                </a>
                <a href="https://twitter.com/laftel_net" className="icon-link" target={"_blank"}
                   style={{marginRight: '25px', float: 'right'}}>
                    <FaTwitter size="20" color="white"/>
                </a>
                <a href="https://vo.la/7wPfY" className="icon-link" target={"_blank"}
                   style={{marginRight: '25px', float: 'right'}}>
                    <FaYoutube size="20" color="white"/>
                </a>


            </footer>

        </div>

    );
}

export default Footer;