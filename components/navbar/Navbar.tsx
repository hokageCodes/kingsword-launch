"use client";
import React, { useState, MouseEventHandler } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import RealLogo from '../../assets/logo.webp';
import './navbar.css';

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsDropdownOpen(false);
    };

    const toggleDropdown: MouseEventHandler<HTMLSpanElement> = (event) => { // Specify MouseEventHandler<HTMLSpanElement> for toggleDropdown
        event.preventDefault(); // Prevent default anchor behavior
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link href="/" className="nav-logo" onClick={closeMenu}>
                    <Image priority src={RealLogo} alt="Logo" className="logo" />
                </Link>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/connect" className="nav-link" onClick={closeMenu}>Connect</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/listen" className="nav-link" onClick={closeMenu}>Listen</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/give" className="nav-link" onClick={closeMenu}>Give</Link>
                    </li>
                    <li className="nav-item location-item">
                        <Link href="/locations" className="nav-link" onClick={closeMenu}>
                            Locations
                        </Link>
                        <span className="dropdown-icon-wrapper" onClick={toggleDropdown}>
                        <AiOutlineDown className={`dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                        </span>
                        {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link href="/locations/calgary" className="dropdown-link" onClick={closeMenu}>Calgary</Link>
                            <Link href="/locations/toronto" className="dropdown-link" onClick={closeMenu}>Toronto</Link>
                            <Link href="/locations/vancouver" className="dropdown-link" onClick={closeMenu}>Vancouver</Link>
                        </div>
                        )}
                    </li>
                </ul>
                <div className="hamburger" onClick={toggleMenu}>
                {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                </div>
            </nav>
        </header>
    );
};

export default NavBar;