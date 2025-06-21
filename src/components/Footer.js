import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="footer-container">
                <div className="footer-content">
                    <p className="copyright">
                        Copyright &copy; {currentYear} <a href="/" style={{ textDecoration: 'none' }}>www.mynotebookapp.com</a> - All rights reserved
                    </p>
                </div>
            </footer >
        </>
    )
}

export default Footer
