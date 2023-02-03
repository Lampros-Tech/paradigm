import React from 'react';
import "../styles/footer.scss";

function Footer() {
    return (
        <div className='footer'>
            <div className='header'>Paradigm</div>
            <hr className='horizon' />
            <div className="page-list">
                <div className="page">
                    <div className='info'>BLOG</div>
                </div>
                <div className="page">
                    <div className='info'>FAQ</div>
                </div>
                <div className="page">
                    <div className='info'>ABOUT</div>
                </div>
                <div className="page">
                    <div className='info'>CONTACT</div>
                </div>
            </div>
            <div className="handle-list">
                <div className="handle">
                    <img src="/images/facebook.svg" className='icon' />
                </div>
                <div className="handle">
                    <img src="/images/twitter.svg" className='icon' />
                </div>
                <div className="handle">
                    <img src="/images/linkedin.svg" className='icon' />
                </div>
                <div className="handle">
                    <img src="/images/instagram.svg" className='icon' />
                </div>
            </div>
            <div className="page-list">
                <div className="page">
                    <div className='info'>terms & conditions</div>
                </div>
                <div className="page">
                    <div className='info'>Privacy Policy</div>
                </div>
            </div>
            <div className="base">
                copyright &#9400; 2023 Paradigm, All rights reserved, Site credits
            </div>
        </div>
    )
}

export default Footer