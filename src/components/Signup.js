import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const lowerEmail = email.toLowerCase();
        if (password !== credentials.cpassword) {
            props.showAlert("Passwords do not match!", "danger"); // Exit the function if passwords don't match
        }

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: lowerEmail, password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('userEmail', credentials.email);
            props.showAlert("Account Created Successfully", "success")
            navigate("/")
            // localStorage.clear();
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
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
        <div className="container mt-2">
            <h2 className="my-3">Create an account to use My NoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type={credentials.showPassword ? 'text' : 'password'} className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
                    <button className="my-1 btn btn-outline-secondary" type="button" onClick={() => togglePasswordVisibility('showPassword')}>
                        <i className={credentials.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>&nbsp;{credentials.showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
