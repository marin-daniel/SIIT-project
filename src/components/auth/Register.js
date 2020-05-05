import React, { useState, useContext } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';

const errorMessages = {
    'username': 'Username is required!',
    'password': 'Password is required!',
    'retype-password': 'Retype password!',
    'different-passwords': 'Password mismatch',
};

function Register() {

    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
        'retype-password': ''
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': '',
        'retype-password': '',
        'different-passwords': ''
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const { setUsername } = useContext(AuthContext);
    const [isDirty, setDirty] = useState(false);
    const history = useHistory();
    let timeout = null;


    async function handleSubmit(e) {
        e.preventDefault();
        setGlobalError('');

        const isInvalid = validateFormData();

        if (!isInvalid) {
            setDirty(false);
            const userReq = await axios('http://localhost:5000/users');
            const response = userReq.data;

            response.map(user => {
                if (user.username === formData.username) {
                    setGlobalError('Username already registered!');
                } else {
                    axios('http://localhost:5000/users', {
                        method: 'POST',
                        data: qs.stringify(formData),
                    });
                    setUsername(formData.username);
                    localStorage.setItem('username', formData.username);

                    setSuccessfull(true);

                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(() => history.push('/'), 3000)
                }
            });
        }
    }

    function validateFormData() {
        const inputs = ['username', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if (formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = {
            ...formError,
            [e.currentTarget.id]: '',
        };

        if (e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }

        setFormError(newError);
        setDirty(true);
    }

    return (
        <div className='form'>
            <h1>Register</h1>

            {(globalErrorMessage ?
                <h3 className='invalid-feedback'>
                    {globalErrorMessage}
                </h3>
                : null)}

            {(isSuccessfull ?
                <h3 className='valid-feedback'>
                    Your username was created successfully!
                </h3>
                : null)}
            <form onSubmit={handleSubmit}>
                <div>
                    <p>
                        <label htmlFor="username">Username</label>
                    </p>
                    <p>
                        <input className={'inputs' + (formError.username ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            value={formData.username}
                            type="text"
                            id="username"
                            placeholder="Enter username"
                        />
                    </p>
                    <div className='invalid-feedback'>
                        {formError.username}
                    </div>
                </div>
                <div>
                    <p>
                        <label htmlFor="password">Password</label>
                    </p>
                    <p>
                        <input className={'inputs' + (formError.password ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            placeholder="Password"
                        />
                    </p>
                    <div className='invalid-feedback'>
                        {formError.password}
                    </div>
                </div>
                <div>
                    <p>
                        <label htmlFor="retype-password">Retype Password</label>
                    </p>
                    <p>
                        <input className={'inputs' + (formError['retype-password'] || formError['different-passwords'] ? ' is-invalid' : '')}
                            onChange={handleInputChange}
                            value={formData['retype-password']}
                            type="password"
                            id="retype-password"
                            placeholder="Retype Password"
                        />
                    </p>
                    <div className='invalid-feedback'>
                        {formError['retype-password']}
                        {formError['retype-password'] ? <br /> : ''}
                        {formError['different-passwords']}
                    </div>
                </div>
                <button type="submit" className='submitButton' disabled={!isDirty}>Register</button>
            </form>
        </div>
    )
}

export default Register;