import React from "react";
import '../css/Footer.scss';
import { ImGithub } from "react-icons/im";

// Footer 진행중 ... 

function Footer() {
    return (
        <footer>
            <div className="max-wrap">

                <div className="bt-logo">
                    <h2>
                        <a href="#">
                            <img src={require('../assets/bt-logo.png')} />
                        </a>
                    </h2>
                </ div>

                <div className="icon">
                    <ImGithub size={40} />
                </div>

                <h3><a href="https://github.com/hmy343/book-search" target="_blank">Team 5, Github Address</a></h3>

                <address>
                    <div>
                        <p><a href="https://github.com/Bora0k" target='_blank' ><b>강</b>보라 /Bora0k</a></p>
                        <p><a href="https://github.com/hmy343" target='_blank' ><b>홍</b>민향 /hmy343</a></p>
                    </div>
                    <div>
                        <p><a href="https://github.com/hyunminini" target='_blank' ><b>김</b>현민 /hyunminini</a></p>
                        <p><a href="https://github.com/realjinkyung" target='_blank' ><b>배</b>진경 /realjinkyung</a></p>
                    </div>
                </address>

                <p className="copy-right">
                    © 2022 Team 5, Mini Project - book-Search
                </p>
            </div>
        </footer>
    )
}

export default Footer;