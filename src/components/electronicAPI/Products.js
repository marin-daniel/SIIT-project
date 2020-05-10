import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';

import ConfigUrl from './ConfigUrl';
import Pagination from './Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Products({ setPartsData, setID }) {
    
    const url = ConfigUrl();

    const search = useQuery().get('q');
    const [parts, setParts] = useState([]);       
    const [qty, setQty] = useState({});

    const [currentPage, setCurrentPage] = useState(1); 
    const [partsPerPage, setPartsPerPage] = useState(5);
    const indexOfLastPart = currentPage * partsPerPage;
    const indexOfFirstPart = indexOfLastPart - partsPerPage;

    async function getParts(){

        // const apiKey = '&callinfo.apiKey=uktbxajzfrsgu26vntg4sffk';
        // const proxyURL = "https://cors-anywhere.herokuapp.com/";
        // const url = 'http://api.element14.com/catalog/products?&storeInfo.id=ro.farnell.com&resultsSettings.offset=0&resultsSettings.numberOfResults=1&resultsSettings.responseGroup=large&callInfo.responseDataFormat=JSON&term=manuPartNum%3A' + search + apiKey;

        // const res = await Axios(url);
        // const response = res.data.manufacturerPartNumberSearchReturn.products;
        // setParts(response);
        // setPartsData(response);

        const res = await Axios(url);
        const response = res.data;
        const newQty = {};

        for (const part of response) {
            newQty[part.id] = 1;
        }
        
        setQty(newQty);
        setParts(response);
        setPartsData(response);
        };

    useEffect(() => {
        getParts();
    }, []);

    function handleInputChange(e) {
        const newQty = { ...qty };
        newQty[e.currentTarget.id] = e.currentTarget.value;
        setQty(newQty);
    };

    function findParts(part) {
        if (search) {
            return part.translatedManufacturerPartNumber.includes(search);
        }
        return true;
    };

    function getPageNo(pageNumber){
        setCurrentPage(pageNumber);
    }

    function getPartsPerPage(partsOnPage){
        setPartsPerPage(partsOnPage);
    }


    return (
        <div className='products-list'>
            <img className='banner' src='/images/banner-passive-component.png' alt='banner'></img>
            <>
                <table className='product-list-table'>
                    <tbody>
                        {parts.filter(findParts).slice(indexOfFirstPart, indexOfLastPart).map(part => (
                            <tr key={part.id}>
                                <td>
                                    <img className='part-img'
                                        src={(part.image ?
                                            (part.image.vrntPath === 'nio/' ? 'https://ro.farnell.com/productimages/standard/en_US/' + part.image.baseName :
                                                'https://ro.farnell.com/productimages/standard/en_GB/' + part.image.baseName) :
                                            null)} alt='partImg'>
                                    </img>
                                </td>
                                <td>{(part.datasheets ?
                                    <a href={part.datasheets[0].url} target='_blank' rel="noopener noreferrer">
                                        <img src='/images/pdf.png' alt='datasheetIcon'>
                                        </img>
                                    </a> : null)}
                                </td>
                                <td className='part-info'><Link to={'/products/' + part.id}><h2>{part.displayName}</h2></Link></td>
                                <td>{part.prices[0].cost} RON</td>
                                <td >
                                    <input onChange={handleInputChange}
                                        id={part.id}
                                        type='text'
                                        name='nr_buc'
                                        value={qty[part.id]}
                                        className='qty' />
                                    <button onClick={(e) => setID(part.id, qty[part.id])} className='submitButton'>Add to BOM</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex-container page-number'>
                    <Pagination
                        // partsPerPage={partsPerPage}
                        totalParts={parts.filter(findParts).length}
                        getPageNo={getPageNo}
                        getPartsPerPage={getPartsPerPage}
                    />
                </div>
            </>
        </div>
    )
}

export default Products;