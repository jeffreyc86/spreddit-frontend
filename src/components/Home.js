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
                <h1>Description!</h1>
                <img src="" alt="welcome"></img>
                <p>{quote}</p>
                <p> - {quoteAuthor}</p>
            </div>
            {currentUser ? null : <div className="home-signup"><h1 onClick={handleSignUpClick}>Sign Up to View More!</h1></div>}
        </div>
    )
}

export default Home;