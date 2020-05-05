import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useHistory } from 'react-router-dom';


const errorMessages = {
    'username': 'You must enter a username!',
    'password': 'You must enter a password!',
};

export default function Login() {
    const [formData, setFormData] = useState({
        'username': '',
        'password': '',
    });

    const [formError, setFormError] = useState({
        'username': '',
        'password': '',
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const [isSuccessfull, setSuccessfull] = useState(false);
    const [isDirty, setDirty] = useState(false);
    const history = useHistory();
    let timeout = null;

    const { setUsername } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setGlobalError('');
        setSuccessfull(false);

        const isInvalid = validateFormData();

        if (!isInvalid) {
            setDirty(false);
            const userReq = await axios('http://localhost:5000/users');
            const response = userReq.data;

            response.map(user => {
                if (user.username !== formData.username) {
                    setGlobalError('Username does not exist! Please register!');

                } else if (user.password !== formData.password) {
                    setGlobalError('Password missmatch!');

                } else {

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
        const inputs = ['username', 'password'];
        const newError = { ...formError };
        let isInvalid = false;

        for (const input of inputs) {
            if (!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {
        setDirty(true);

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
    }

    return (
        <div className='form'>
            <h1>Login</h1>

            {(globalErrorMessage ?
                <h3 className='invalid-feedback'>
                    {globalErrorMessage}
                </h3>
                : null)}

            {(isSuccessfull ?
                <h3 className='valid-feedback'>
                    You have been successfully logged in!
                </h3>
                : null)}
            <form onSubmit={handleSubmit}>
                <div >
                    <label >Username</label>
                    <input className={'inputs' + (formError.username ? ' is-invalid' : '')}
                        onChange={handleInputChange}
                        value={formData.username}
                        type="text"
                        id="username"
                        placeholder="Enter username"
                    />

                    <div className='invalid-feedback'>
                        {formError.username}
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className={'inputs' + (formError.password ? ' is-invalid' : '')}
                        onChange={handleInputChange}
                        value={formData.password}
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                    <div className='invalid-feedback'>
                        {formError.password}
                    </div>
                </div>
                <button type="submit" className='submitButton' disabled={!isDirty}>Login</button>
            </form>
        </div>
    )
}
