import React from "react";
import '../css/Header.scss'



function Header() {
    return (

        <header>
            <div className="max-wrap">
                <h1>
                    <a href="/">
                        <img src={require('../assets/header-logo.png')} />
                    </a>
                </h1>
            </div>
        </header>

    )
}

export default Header;