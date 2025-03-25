import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [user_id, setUserId] = useState('');
    const [book_id, setBookId] = useState('');
    const [borrow_date, setBorrowDate] = useState('');
    const [return_date, setReturnDate] = useState('');
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get('http://localhost:5000/api/transactions')
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error fetching transactions', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user_id || !book_id || !borrow_date || !return_date) {
            alert('All fields are required');
            return;
        }
        axios.post('http://localhost:5000/api/transactions', { user_id, book_id, borrow_date, return_date })
        .then(() => {
            setUserId('');
            setBookId('');
            setBorrowDate('');
            setReturnDate('');
            fetchTransactions();
            setShowModal(false);
        })
        .catch((error) => {
            console.error('Error adding transaction:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Failed to add transaction');
        });

    };

    const handleStatusUpdate = (id, status) => {
        axios.put(`http://localhost:5000/api/transactions/${id}`, { status })
            .then(() => fetchTransactions())
            .catch(error => console.error('Error updating status', error));
    };

    const handleSearch = () => {
        axios.get('http://localhost:5000/api/transactions/search', {
            params: { user: search, status: filterStatus }
        })
            .then(response => setTransactions(response.data))
            .catch(error => console.error('Error searching transactions', error));
    };

    const deleteReturnedTransactions = () => {
        if (window.confirm('Are you sure you want to delete all returned transactions?')) {
            axios
                .delete('http://localhost:5000/api/transactions/returned')
                .then((response) => {
                    alert(response.data.message); // Show a success message
                    fetchTransactions(); // Refresh the transactions list
                })
                .catch((error) => {
                    console.error('Error deleting returned transactions:', error.response?.data || error.message);
                    alert('Error deleting returned transactions: ' + (error.response?.data?.error || 'Unknown error'));
                });
        }
    };
    

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Transaction Management</h2>

            {/* Button to open modal */}
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
                Add Transaction
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Add Transaction</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="number"
                                    placeholder="User ID"
                                    value={user_id}
                                    onChange={(e) => setUserId(e.target.value)}
                                    className="p-2 border rounded w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Book ID"
                                    value={book_id}
                                    onChange={(e) => setBookId(e.target.value)}
                                    className="p-2 border rounded w-full"
                                />
                                Borrow_date:
                                <input
                                    type="date"
                                    value={borrow_date}
                                    onChange={(e) => setBorrowDate(e.target.value)}
                                    className="p-2 border rounded w-full"
                                />
                                Return_date
                                <input
                                    type="date"
                                    value={return_date}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Search/Filter */}
            <div className="flex space-x-4 mb-4">
                <input type="text" placeholder="Search by User or Book" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded" />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
                    <option value="">All Status</option>
                    <option value="Borrowed">Pending...</option>
                    <option value="Returned">Returned</option>
                </select>
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
                <button
            onClick={deleteReturnedTransactions}
            className="bg-red-500 text-white px-10 mx-[330px] py-2 rounded hover:bg-red-600 transition">
                Delete Returned Transactions
            </button>
            </div>

            {/* Transactions Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">User</th>
                        <th className="border p-2">Book</th>
                        <th className="border p-2">Issue/Borrowed Date</th>
                        <th className="border p-2">Return Date</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="border p-2">{transaction.user_name}</td>
                            <td className="border p-2">{transaction.book_title}</td>
                            <td className="border p-2">{transaction.borrow_date}</td>
                            <td className="border p-2">{transaction.return_date}</td>
                            <td className="border p-2">{transaction.status}</td>
                            <td className="border p-2">
                                {transaction.status === 'borrowed' && (
                                    <button onClick={() => handleStatusUpdate(transaction.id, 'Returned')} className="bg-yellow-500 text-black px-2 py-1 rounded">
                                        Mark as Returned
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;