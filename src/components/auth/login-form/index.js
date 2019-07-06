import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginForm = ({ onLogin, isLoggingIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        onLogin({ username, password })
    }

    return (
        <div>
            <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                value={username}
            />
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button onClick={handleLogin}>
                {isLoggingIn ? 'Logging In ...' : 'Login Now'}
            </button>
            <button>
                <Link to="/auth/register">Register</Link>
            </button>
        </div>
    )
}

export default LoginForm
