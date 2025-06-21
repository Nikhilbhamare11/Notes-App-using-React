import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userEmail', credentials.email);
            props.showAlert("Logged in Successfully", "success")
            navigate("/")
            // window.location.reload();
            // localStorage.clear();
        } else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const togglePasswordVisibility = (type) => {
        setCredentials((prevState) => ({
            ...prevState, [type]: !prevState[type],
        }))
    }

    return (
        <div className="mt-3">
            <h2 className="my-3">Login to continue to My NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" required />
                    <button className="my-1 btn btn-outline-secondary" type="button" onClick={() => togglePasswordVisibility('showPassword')}>
                        <i className={credentials.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>&nbsp;{credentials.showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
