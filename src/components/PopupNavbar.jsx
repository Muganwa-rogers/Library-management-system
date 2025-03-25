import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PopupNavbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const closePopup = () => setIsPopupOpen(false);

    return (
        <div>
            {/* Button to trigger the popup */}
            <button
                onClick={togglePopup}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg focus:outline-none transition duration-[0.5] hover:bg-blue-400 fixed top-5 right-5 z-50"
            >
                ☰
            </button>

            {/* Popup Navigation Menu */}
            {isPopupOpen && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
                    onClick={closePopup}
                >
                    <div
                        className="bg-blue-600 text-white rounded-lg p-6 shadow-2xl w-1/4 transition-all transform duration-500 ease-in-out scale-100 backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-300">Library System</h2>
                            <div className="space-y-4">
                                <Link
                                    to="/books"
                                    className="block text-lg hover:text-yellow-400 transition duration-200"
                                    onClick={closePopup}
                                >
                                    Books
                                </Link>
                                <Link
                                    to="/users"
                                    className="block text-lg hover:text-yellow-400 transition duration-200"
                                    onClick={closePopup}
                                >
                                    Users
                                </Link>
                                <Link
                                    to="/transactions"
                                    className="block text-lg hover:text-yellow-400 transition duration-200"
                                    onClick={closePopup}
                                >
                                    Transactions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopupNavbar;
