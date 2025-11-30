'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                {/* Logo */}
                <Link href="/" className="logo-link">
                    <span className="text-gradient">Nexo</span>Cloud
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <Link href="/oferta" className="nav-link">Oferta</Link>
                    <Link href="/chmura" className="nav-link">Chmura</Link>
                    <Link href="/vps" className="nav-link">VPS</Link>
                    <Link href="/o-nas" className="nav-link">O nas</Link>
                    <Link href="/kontakt" className="btn-primary">Kontakt</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-toggle"
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line" style={{
                        transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'
                    }}></span>
                    <span className="hamburger-line" style={{
                        opacity: isOpen ? 0 : 1
                    }}></span>
                    <span className="hamburger-line" style={{
                        transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'
                    }}></span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="mobile-menu-dropdown">
                    <Link href="/oferta" onClick={() => setIsOpen(false)} className="nav-link">Oferta</Link>
                    <Link href="/chmura" onClick={() => setIsOpen(false)} className="nav-link">Chmura</Link>
                    <Link href="/vps" onClick={() => setIsOpen(false)} className="nav-link">VPS</Link>
                    <Link href="/o-nas" onClick={() => setIsOpen(false)} className="nav-link">O nas</Link>
                    <Link href="/kontakt" onClick={() => setIsOpen(false)} className="nav-link" style={{ color: 'var(--primary-orange)', fontWeight: 'bold' }}>Kontakt</Link>
                </div>
            )}
        </nav>
    );
}
