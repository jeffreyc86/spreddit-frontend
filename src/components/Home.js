import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"

function Home({currentUser}){

    const [quote, setQuote] = useState("")
    const [quoteAuthor, setQuoteAuthor] = useState("")
    
    const history = useHistory()
    
    useEffect(()=>{
        const quoteTags = ['faith', 'famous-quotes', 'friendship','happiness','inspirational','life','future','love','proverb','success','wisdom','technology']
        const tag = Math.floor(Math.random() * quoteTags.length)
        
        fetch(`https://api.quotable.io/random?tags=${quoteTags[tag]}`)
            .then(res=>res.json())
            .then(data=>{
                setQuote(data.content)
                setQuoteAuthor(data.author)
            })
    },[])

    function handleSignUpClick() {
        history.push("/signup")
    }
    
    return(
        <div className="home">
            <div className="home-description">
                <div className="home-banner">
                    <img src={process.env.PUBLIC_URL + "/images/homebanner.png"} alt="home"></img>
                    <div className="home-quote">
                        <h1>A Global Community of</h1>
                        <h1>Like Minded Humans</h1>
                        <h1>Socially Distancing</h1>
                    </div>
                </div>
            </div>
                <div className="random-quote">
                    <h4>Motivational Quote To Get Through The Day</h4>
                        <div className="quote-div">
                            <img src={process.env.PUBLIC_URL + "/images/openquote.jpg"} alt="open quote"></img>
                            <p className="quote">{quote}</p>
                            <img src={process.env.PUBLIC_URL + "/images/closequote.jpg"} alt="close quote"></img>
                        </div>
                    <p className="quote-author">{quoteAuthor}</p>
                </div>
            {currentUser ? null : <div className="home-signup"><h1 onClick={handleSignUpClick}>Join Our Community!</h1></div>}
        </div>
    )
}

export default Home;