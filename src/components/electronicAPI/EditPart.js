import React, { useContext, useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import Axios from 'axios';
import { Redirect } from 'react-router';

import ConfigUrl from './ConfigUrl';

function EditPart() {
    
    const { partId } = useParams();
    const [redirect, setRedirect] = useState(false);
    const { username } = useContext(AuthContext);
    const [part, setPart] = useState(null);

    const url = ConfigUrl();

    async function getPartByID(id) {
        const res = await Axios(url + id);
        const response = res.data;
        setPart(response);
    }

    useEffect(() => {
        getPartByID(partId)
    }, [partId])

    async function handleSave(e) {
        e.preventDefault();

        const res = await Axios(url + partId, {
            method: 'PUT',
            headers: {
                'user': username
            },
            data: part
        });
        setRedirect(true);
    }

    function handleInputChange(e) {
        setPart( { ...part,
            [e.currentTarget.id]: e.currentTarget.value  
            
        }); 
    }

    function handleAttributeInputChange(e){
        const newPart = {...part};
        newPart.attributes[e.currentTarget.getAttribute('data-index')][e.currentTarget.name] = e.currentTarget.value;
        setPart(newPart);
    }
 
    if (part) {
        if(username){
        return (
            <section >
                <div className='form'>
                <h1>Edit Part</h1>
                <form onSubmit={handleSave}>
                     <div>
                        <label htmlFor='displayName'>Display name</label>
                    </div>
                    <div>
                        <input
                            className='inputs'
                            onChange={ handleInputChange }
                            value={part.displayName}
                            type="text"
                            id="displayName"
                            placeholder="Enter displayName"
                        />
                    </div>
                    <div>
                        <img src={(part.image ?
                            (part.image.vrntPath === 'nio/' ? 'https://ro.farnell.com/productimages/standard/en_US/' + part.image.baseName :
                                'https://ro.farnell.com/productimages/standard/en_GB/' + part.image.baseName) :
                            null)} alt='partImg'>
                        </img>
                        <div className='technicalDetails'>
                            <div>
                                <label htmlFor="vendorName">Manufacturer: </label>
                                <input
                                    className='inputs'
                                    onChange={ handleInputChange }
                                    name='vendorName'
                                    value={part.vendorName}
                                    type="text"
                                    id="vendorName"
                                    placeholder="Enter Producator"
                                />
                            </div>
                            <div>
                                <label htmlFor="translatedManufacturerPartNumber">Manufacturer P/N: </label>
                                <input
                                    className='inputs'
                                    onChange={ handleInputChange }
                                    name='translatedManufacturerPartNumber'
                                    value={part.translatedManufacturerPartNumber}
                                    type="text"
                                    id="translatedManufacturerPartNumber"
                                    placeholder="Nr. de reper producător"
                                />
                            </div>
                            <h4>Fişă tehnică: <span style={{ fontWeight: 'normal' }}>{(part.datasheets ?
                                <a href={part.datasheets[0].url} target='_blank' rel="noopener noreferrer">
                                    <img src='/images/pdf.png' alt='datasheetIcon'>
                                    </img> {part.translatedManufacturerPartNumber}
                                </a> : 'N/A')}</span>
                            </h4>

                            <h3>Technical details:</h3>
                            {part.attributes.map((attribute, index) => (
                                <div key={index} className='flex-container'>
                                    <div>
                                        <div>
                                            <label htmlFor={'attributeLabel' + index}>Attribute Label</label>
                                        </div>
                                        <div>
                                            <input
                                                className='inputs'
                                                onChange={handleAttributeInputChange}
                                                name='attributeLabel'
                                                value={attribute.attributeLabel}
                                                data-index={index}
                                                type='text'
                                                id={'attributeLabel' + index}
                                                placeholder='Enter attribute label'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor={'attributeValue' + index}>Attribute Value</label>
                                        </div>
                                        <div>
                                            <input
                                                className='inputs'
                                                onChange={handleAttributeInputChange}
                                                name='attributeValue'
                                                value={attribute.attributeValue}
                                                data-index={index}
                                                type='text'
                                                id={'attributeValue' + index}
                                                placeholder='Enter attribute value'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor={'attributeUnit' + index}>Attribute Unit</label>
                                        </div>
                                        <div>
                                            <input
                                                className='inputs'
                                                onChange={handleAttributeInputChange}
                                                name='attributeUnit'
                                                value={attribute.attributeUnit}
                                                data-index={index}
                                                type='text'
                                                id={'attributeUnit' + index}
                                                placeholder='Enter attribute unit'
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            ))}

                        </div>
                    </div>
                    <button type='submit' onSubmit={handleSave} className='submitButton'>Save</button>
                </form>
                </div>
                {redirect && (<Redirect to={'/products/' + part.id}/>)}
            </section>
        )
        } else{
           return <h2>You are not allowed to!</h2>
        }
    } else {
        return <h2>Loading part data...</h2>
    }
}


export default EditPart;