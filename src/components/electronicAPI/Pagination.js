import React, { useState, useEffect } from 'react';

function Pagination( { totalParts, getPageNo, getPartsPerPage}){     

    const [partsPerPage, setPartsPerPage] = useState(5);

    const pageNumbers = [];
    const [activePageId, setActivePageId] = useState(1);
    const [indexOfFirstPage, setIndexOfFirstPage] = useState(0)
    const [indexOfLastPage, setIndexOfLastPage] = useState(5)    

    const [fwButtonIsActive, setFwButtonIsActive] = useState(false);
    const [rwButtonIsActive, setRwButtonIsActive] = useState(false);

    for (let i=1; i <= Math.ceil(totalParts / partsPerPage); i++){
        pageNumbers.push(i);
    }

    useEffect(() => {
        if (activePageId === pageNumbers.length){
            setFwButtonIsActive(true); 
                       
        } else {
            setFwButtonIsActive(false);
        }

        if(activePageId === 1) {
            setRwButtonIsActive(true);
        } else {
            setRwButtonIsActive(false);
        }        
    }, [activePageId]);


    function handleClick(e, pageNumber){
        e.preventDefault();
        getPageNo(pageNumber);
        setActivePageId(Number(e.currentTarget.id));
    }

    function handlePartsPerPage(e){
        setPartsPerPage(e.currentTarget.value);
        getPartsPerPage(e.currentTarget.value);
        setIndexOfFirstPage(0)
        setIndexOfLastPage(5)
        setActivePageId(1);
        getPageNo(1);
    }

    function handlePageFW(e){
        e.preventDefault();
        if ( activePageId > 2 && indexOfLastPage <= pageNumbers.length - 1){            
            setIndexOfFirstPage(indexOfFirstPage + 1);
            setIndexOfLastPage(indexOfLastPage + 1);
        }
        setActivePageId(activePageId + 1);
        getPageNo(activePageId + 1);
          
    }

    function handlePageRW(e){
        e.preventDefault();
        if ( activePageId < indexOfLastPage - 1 && indexOfFirstPage !== 0){
            setIndexOfFirstPage(indexOfFirstPage - 1);
            setIndexOfLastPage(indexOfLastPage - 1);
        }        
        setActivePageId(activePageId - 1);
        getPageNo(activePageId - 1);
    }

    return(
       <>    
            <button
                onClick={handlePageRW}
                disabled={rwButtonIsActive}
                className ={ 'page-button ' + (rwButtonIsActive ? 'page-buttons-prev-not-active' : 'page-buttons-prev-active')}>
            </button>    
            {pageNumbers.slice(indexOfFirstPage, indexOfLastPage).map(pageNumber => (                
                <a  className={activePageId === pageNumber ? 'active' : null}
                    key={pageNumber}
                    onClick={e => handleClick(e, pageNumber)}
                    href='!#'
                    id={pageNumber}>
                    {pageNumber}
                </a>                
            ))}
            <button
                onClick={handlePageFW}
                disabled={fwButtonIsActive}
                className ={ 'page-button ' + (fwButtonIsActive ? 'page-buttons-next-not-active' : 'page-buttons-next-active')}>                
            </button> 
            <select onChange={handlePartsPerPage}>
                <option value = '5'>5</option>
                <option value = '10'>10</option>
                <option value = '15'>15</option>
                <option value = '20'>20</option>
            </select>            
       </>
    )
}

export default Pagination;