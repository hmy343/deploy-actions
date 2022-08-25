import React, { useEffect, useState } from "react";
import '../css/ScrollTop.scss'

function ScrollTop() {
  
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  
  useEffect(()=>{
      window.addEventListener('scroll', updateScroll);
  });
  

  
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth"})
  };

    return (
        <div className={ scrollPosition > 200 ? 'scroll-top-on' : 'scroll-top' }
             onClick={goToTop} >
            <p>Top</p>
        </div>
    )
}


export default ScrollTop