import React from 'react';
import imagePathOne from '../photos/maor.jpg';
import imagePathTwo from '../photos/noamr.jpg';
import { RiLinkedinBoxFill, RiGithubFill, RiFacebookBoxFill } from 'react-icons/ri';
import { useState } from 'react';
import './about.css';
import './form.css';

function About() {

    const [hoveredCard, setHoveredCard] = useState(null);
    return (
        // <div className='about-container'>
        <div className='container'>
            <h1 className='l-heading '><span className="text-primary">About</span> The Team</h1>
            <div className='card-container'>
                {/* Left Card */}
                <div
                    onMouseEnter={() => setHoveredCard('left')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`card ${hoveredCard === 'left' ? 'hovered-left' : ''}`}
                >
                    <img src={imagePathOne} className='card-img' alt='maor' />
                    <div className='card-body'>
                        <h2 className='crad-title'>Maor</h2>
                        <p className='card-sub-title'>3rd Computer Science student</p>
                        <p className='card-info'>I love challenge myself with coding and see the results</p>
                        <div className='btn-container'>

                            <a className='card-btn'
                                href='#'
                                target='_blank' rel="noreferrer"><RiLinkedinBoxFill /></a>
                            <a className='card-btn' href='https://github.com/Maor323' target='_blank' rel="noreferrer"><RiGithubFill /></a>
                            <a className='card-btn' href='#'
                                target='_blank' rel="noreferrer"><RiFacebookBoxFill /></a>
                        </div>
                    </div>
                </div>

                {/* Right Card */}
                <div
                    className={`card ${hoveredCard === 'right' ? 'hovered-right' : ''}`}
                    onMouseEnter={() => setHoveredCard('right')}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    <img src={imagePathTwo} className='card-img' alt='noam' />
                    <div className='card-body'>
                        <h2 className='crad-title'>Noam</h2>
                        <p className='card-sub-title'>3rd Computer Science student</p>
                        <p className='card-info'>I love to code and build new things</p>
                        <div className='btn-container'>

                            <a className='card-btn' href='#'
                                target='_blank' rel="noreferrer"><RiLinkedinBoxFill /></a>
                            <a className='card-btn' href='https://github.com/NR1812' target='_blank' rel="noreferrer"><RiGithubFill /></a>
                            <a className='card-btn' href='#'
                                target='_blank' rel="noreferrer"><RiFacebookBoxFill /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default About;

