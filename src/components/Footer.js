import React from 'react'
import {useHistory} from "react-router-dom"

function Footer(){

    const history = useHistory()

    function logoClick(){
        history.push("/")
    }

    return (
        <div className="footer">
            <a id="footer-mh" href="https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html">Mental Health Support</a>
            <img className="footer-logo" src={process.env.PUBLIC_URL + "/images/spreddit.png"} alt="🙂" onClick={logoClick}/>
            <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC Covid-19 Guidlines</a>
        </div>
    )
}


export default Footer;