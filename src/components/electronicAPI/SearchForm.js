import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchForm(){

    const [searchInput, setSearchInput] = useState(''); 
    const history = useHistory();
    let [timeout, updateTimeout] = useState(null);

    function handleInputChange(e) {
        if(timeout){
            clearTimeout(timeout);
        }

        const searchString = e.currentTarget.value.toUpperCase();
        setSearchInput(searchString)
        updateTimeout(setTimeout(() => history.push('/products?q=' + searchString), 400))
    }

    return (
        <section className='searchSection'>
            <form className='search-form' autocomplete='off'>
                <div className='flex-container'>
                    <input
                        className='search-input'
                        onChange={handleInputChange}
                        value={searchInput}
                        type="text"
                        id="search-part"
                        placeholder="Search for part number"
                        aria-label = 'search'
                    />
                    <button type="submit" className='search-button' >
                        <img src='/images/top_search_submit_bg_new.png' alt='search-button'></img>
                    </button>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;