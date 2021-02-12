import React from 'react'

function Search({search, setSearch}){


    return(
        <div className="searchbar">
            <h3>Search Posts by Title</h3>
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