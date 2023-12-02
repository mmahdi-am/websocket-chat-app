import React from 'react'
import './sharebutton.css'
function ShareButton() {
    return (

        <div className="hover">
            <span> share</span>
            <a className="social-link" href="https://twitter.com/twitter" target="_blank">
                <i className="fab fa-twitter">
                </i>
            </a>
            <a className="social-link" href="https://codepen.io/joshuaward/" target="_blank">
                <i className="fab fa-codepen">
                </i>
            </a>
            <a className="social-link" href="https://www.instagram.com/joshuaward/" target="_blank">
                <i className="fab fa-instagram">
                </i>
            </a>
            <a className="social-link" href="https://github.com/joshuaward" target="_blank">
                <i className="fab fa-github">
                </i></a>
        </div>
    )
}

export default ShareButton