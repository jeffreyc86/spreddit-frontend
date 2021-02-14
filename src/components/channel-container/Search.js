import React from 'react'

function Search({search, setSearch}){


    return(
        <div className="searchbar">
            <h4>Search Posts by Title</h4>
            <input
                type="text"
                placeholder="Enter a Title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}

            />
        </div>
    )
}


export default Search;