import React, { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

import ConfigUrl from './ConfigUrl';

function AddNewPartData() {

    const { username } = useContext(AuthContext);
    const url = ConfigUrl();
    const history = useHistory();
    let timeout = null;

    const [isSuccessfull, setSuccessfull] = useState(false);
    const [globalErrorMessage, setGlobalError] = useState('');
    const [isDirty, setDirty] = useState(false);

    const [formData, setFormData] = useState({
        'displayName': '',
        'vendorName': '',
        'translatedManufacturerPartNumber': '',
        'image': {
            'baseName': '',
            'vrntPath': ''
        },
        'prices': [{
            'cost': ''
        }],
        'datasheets': [{
            'url': ''
        }],
        'attributes': [{
            'attributeLabel': '',
            'attributeUnit': '',
            'attributeValue': ''
        }]
    });


    async function handleSave(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessfull(false);

        const isInvalid = validateFormData();

        if (!isInvalid) {
            setDirty(false);

            Axios(url, {
                method: 'POST',
                headers: {
                    'user': username
                },
                data: formData
            });
            setSuccessfull(true);

            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => history.push('products/'), 2000)
        }
    };

    function validateFormData() {
        const inputs = ['displayName', 'vendorName', 'translatedManufacturerPartNumber'] 
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                setGlobalError('Marked fields are mandatory!');
                isInvalid = true;
            }
        }
        
        if (!formData.prices[0].cost || !formData.datasheets[0].url || !formData.image.baseName || !formData.image.vrntPath){
                setGlobalError('Marked fields are mandatory!');
                isInvalid = true;               
            }

        return isInvalid;
    }

    function handleInputChange(e) {
        setDirty(true);
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });
    };

    function handleAddNewAttribute(e) {
        e.preventDefault();
        const newFormData = {...formData};
        newFormData.attributes.push({
                'attributeLabel': '',
                'attributeUnit': '',
                'attributeValue': ''
            });
        setFormData(newFormData);
    };   

    function handleAttributeInputChange(e){
        const newFormData = {...formData};
        newFormData.attributes[e.currentTarget.getAttribute('data-index')][e.currentTarget.name] = e.currentTarget.value;
        setFormData(newFormData);
    };

    function handleImageChange(e) {
        setDirty(true);
        const newFormData = {...formData};
        newFormData.image[e.currentTarget.name] = e.currentTarget.value;;
        setFormData(newFormData);
    };

    function handlePriceChange(e) {
        setDirty(true);
        const newFormData = {...formData};
        newFormData.prices[0][e.currentTarget.name] = e.currentTarget.value;
        setFormData(newFormData);
    }

    function handleDatasheetChange(e) {
        setDirty(true);
        const newFormData = {...formData};
        newFormData.datasheets[0][e.currentTarget.name] = e.currentTarget.value;
        setFormData(newFormData);
    };

    return (
        <section>
            {username ?
            <div className='form'>
                <h1>Add New Part</h1>

                {(globalErrorMessage ?
                <h3 className='invalid-feedback'>
                    {globalErrorMessage}
                </h3>
                : null)}

                {(isSuccessfull ?
                <h3 className='valid-feedback'>
                    Part added successfully!
                </h3>
                : null)}
                <form onSubmit={handleSave}>
                    <div>
                        <label htmlFor='displayName'>Display Name</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            name='displayName'
                            value={formData.displayName}
                            type='text'
                            id='displayName'
                            placeholder='Enter display name'
                        />
                    </div>
                    <div>
                        <label htmlFor='vendorName'>Vendor Name</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            name='vendorName'
                            value={formData.vendorName}
                            type='text'
                            id='vendorName'
                            placeholder='Enter vendor name'
                        />
                    </div>
                    <div>
                        <label htmlFor='translatedManufacturerPartNumber'>Manufacturer Part Number</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            name='translatedManufacturerPartNumber'
                            value={formData.translatedManufacturerPartNumber}
                            type='text'
                            id='translatedManufacturerPartNumber'
                            placeholder='Enter manufacturer part number'
                        />
                    </div>
                    <div>
                        <label htmlFor='baseName'>Image name</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleImageChange}
                            name='baseName'
                            value={formData.image.baseName}
                            type='text'
                            id='baseName'
                            placeholder='Enter image name'
                        />
                    </div>
                    <div>
                        <label htmlFor='vrntPath'>Image path</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleImageChange}
                            name='vrntPath'
                            value={formData.image.vrntPath}
                            type='text'
                            id='vrntPath'
                            placeholder='Enter image path'
                        />
                    </div>
                    <div>
                        <label htmlFor='cost'>Price</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handlePriceChange}
                            name='cost' 
                            value={formData.prices.cost}
                            type='text'
                            id='cost'
                            placeholder='Enter price'
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>Datasheet URL</label>
                    </div>
                    <div>
                        <input className={'inputs' + (globalErrorMessage ? ' is-invalid' : '')}
                            onChange={handleDatasheetChange}
                            name='url'
                            value={formData.datasheets.url}
                            type='text'
                            id='url'
                            placeholder='Enter datasheet url'
                        />
                    </div>
                    <h1>Attributes</h1>
                    <div>
                        {formData.attributes.map((attributeInput, index) => (
                            < div key={index}>
                                <div>
                                    <label htmlFor={'attributeLabel' + index}>Attribute Label</label>
                                </div>
                                <div>
                                    <input className='inputs'
                                        onChange={handleAttributeInputChange}
                                        name='attributeLabel'
                                        value={attributeInput.attributeLabel}
                                        data-index={index}
                                        type='text'
                                        id={'attributeLabel' + index}
                                        placeholder='Enter attribute label'
                                    />
                                </div>
                                <div>
                                    <label htmlFor={'attributeUnit' + index}>Attribute Unit</label>
                                </div>
                                <div>
                                    <input className='inputs'
                                        onChange={handleAttributeInputChange}
                                        name='attributeUnit'
                                        value={attributeInput.attributeUnit}
                                        data-index={index}
                                        type='text'
                                        id={'attributeUnit' + index}
                                        placeholder='Enter attribute unit'
                                    />
                                </div>
                                <div>
                                    <label htmlFor={'attributeValue' + index}>Attribute Value</label>
                                </div>
                                <div>
                                    <input className='inputs'
                                        onChange={handleAttributeInputChange}
                                        name='attributeValue'
                                        value={attributeInput.attributeValue}
                                        data-index={index}
                                        type='text'
                                        id={'attributeValue' + index}
                                        placeholder='Enter attribute value'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleAddNewAttribute} 
                        className='submitButton'>New Attribute
                    </button>
                    <button
                        type='submit'
                        onSubmit={handleSave}
                        className={ isDirty ? 'submitButton' : 'submit-button-inactive'}
                        disabled={!isDirty} >Save
                    </button>

                </form>
            </div>            
            : <h1>You are not allowed to perform this action!!! Please login!</h1>
             }
        </section >
    )
}

export default AddNewPartData;