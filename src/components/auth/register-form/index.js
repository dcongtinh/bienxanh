import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const LoginForm = ({ onRegister, isLoggingIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [errorPassword, setErrorPassword] = useState(false)
    const [email, setEmail] = useState('')

    const handleRegister = () => {
        onRegister({ username, password, email })
    }

    return (
        <div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div>
                <label>RePassword</label>
                <input
                    type="password"
                    onChange={e => {
                        setRePassword(e.target.value)
                        setErrorPassword(e.target.value !== password)
                    }}
                    value={repassword}
                />
                {errorPassword && repassword && (
                    <div>Password not matched!</div>
                )}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <button>
                <Link to="/auth/login">Login</Link>
            </button>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default LoginForm
