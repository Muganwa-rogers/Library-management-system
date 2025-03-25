import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold hover:text-yellow-400 transition">
                    <Link to="/">Library System</Link>
                </div>

                {/* Links */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/books"
                        className="hover:text-yellow-400 transition duration-200"
                    >
                        Books
                    </Link>
                    <Link
                        to="/users"
                        className="hover:text-yellow-400 transition duration-200"
                    >
                        Users
                    </Link>
                    <Link
                        to="/transactions"
                        className="hover:text-yellow-400 transition duration-200"
                    >
                        Transactions
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block md:hidden focus:outline-none"
                >
                    <span className="material-icons text-3xl">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-gray-700 text-white md:hidden">
                    <Link
                        to="/books"
                        className="block py-2 px-4 hover:bg-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Books
                    </Link>
                    <Link
                        to="/users"
                        className="block py-2 px-4 hover:bg-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Users
                    </Link>
                    <Link
                        to="/transactions"
                        className="block py-2 px-4 hover:bg-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Transactions
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
