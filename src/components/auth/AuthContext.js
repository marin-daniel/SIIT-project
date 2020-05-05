import React from 'react'

const AuthContext = React.createContext({
    username: null,
    setUsername: () => {},
});

export default AuthContext;