import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const userEmail = localStorage.getItem('userEmail');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.clear();
        // window.location.reload();
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="logo_img.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> MyNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"> <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link> </li>
                        <li className="nav-item"> <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link> </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup">SignUp</Link>
                    </form> : (<><span className="navbar-brand">Welcome <strong>{userEmail.toLowerCase()}</strong></span><button className="btn btn-primary" onClick={handleLogout}>LogOut</button></>)}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
