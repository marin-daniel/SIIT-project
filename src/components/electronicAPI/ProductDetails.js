import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Axios from 'axios';
import { Redirect } from 'react-router'


function ProductDeatils({ partsList }) {

    const { partId } = useParams();
    const { username } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const [part, setPart] = useState(null);

    // const part = partsList.find((part) => partId === part.id);
    // console.log(part)

    async function getPartByID(id) {
        const res = await Axios('http://localhost:5000/products/' + id);
        const response = res.data;
        setPart(response);
        console.log(response.attributes)
    }

    useEffect(() => {
        getPartByID(partId)
    }, [partId])

    async function handleDelete(e) {
        e.preventDefault();
            Axios('http://localhost:5000/products/' + partId, {
            method: 'DELETE',
            headers: {
                'user': username
            }
        });
        setRedirect(true);
    }

    if (part) {
        return (
            <div className='side-container'>                
                <div className='product-details'>                    
                    <img src={(part.image ?
                        (part.image.vrntPath === 'nio/' ? 'https://ro.farnell.com/productimages/standard/en_US/' + part.image.baseName :
                            'https://ro.farnell.com/productimages/standard/en_GB/' + part.image.baseName) :
                        null)} alt='partImg'>
                    </img>
                    <h3>{part.displayName}</h3>
                    <h4 >Manufacturer: <span>{part.vendorName}</span></h4>
                    <h4>Manufacturer P/N: <span>{part.translatedManufacturerPartNumber}</span></h4>
                    <h4>Datasheet: <span>{(part.datasheets ?
                        <a href={part.datasheets[0].url} target='_blank' rel="noopener noreferrer">
                            <img src='/images/pdf.png' alt='datasheetIcon'>
                            </img> {part.translatedManufacturerPartNumber}
                        </a> : 'N/A')}</span>
                    </h4>
                </div>
                <div className='product-details'>               

                    <h3>Technical details:</h3>
                    {part.attributes.map(attribute => (
                        <h4 key={attribute.attributeLabel}>{attribute.attributeLabel} :<span>{attribute.attributeValue} {attribute.attributeUnit} </span></h4>
                    ))}
                </div>

                {
                    username ?
                        <>
                            <button className='submitButton'>
                                <Link className="btn btn-primary" to={'/products/edit/' + part.id}>Edit Part</Link>
                            </button>
                            <button type='submit' onClick={handleDelete} className='submitButton'>Delete</button>
                        </>
                        :
                        null
                }
                {redirect && (<Redirect to={'/products'} />)}
            </div>

        )
    } else {
        return <h2>Loading</h2>
    }

}

export default ProductDeatils;