import React, { useState } from 'react';

function Pagination( {partsPerPage, totalParts, paginate} ){

    const pageNumbers = [];
    const [activePageId, setActivePageId] = useState(1)

    for (let i=1; i <= Math.ceil(totalParts / partsPerPage); i++){
        pageNumbers.push(i);
    }

    function handleClick(e, pageNumber){
        e.preventDefault();
        paginate(pageNumber);
        setActivePageId(Number(e.currentTarget.id))
    }

    return(
       <>        
            {pageNumbers.map(pageNumber => (                
                <a  className={activePageId === pageNumber ? 'active' : null}
                    key={pageNumber}
                    onClick={e => handleClick(e, pageNumber)}
                    href='!#'
                    id={pageNumber}>
                    {pageNumber}
                </a>                
            ))}
       </>
    )
}

export default Pagination;