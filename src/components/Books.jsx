import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaFilter, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [showPopup, setShowPopup] = useState({ type: null, book: null });
  const [filter, setFilter] = useState("");

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add or Edit Book
  const handleSaveBook = async (book) => {
    const isEditing = Boolean(book.id);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:5000/api/books/${book.id}`
      : "http://localhost:5000/api/books";
  
    // Remove id from book data when adding a new book
    const bookData = { ...book };
    if (!isEditing) delete bookData.id; // Prevents sending null/undefined id
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });
      const savedBook = await response.json();
      fetchBooks();
      setShowPopup({ type: null, book: null });
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };
  

  // Delete Book
  const handleDeleteBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Filter books
  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.category]
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Books Management</h1>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowPopup({ type: "add", book: null })}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Book
        </button>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <input
            type="text"
            placeholder="Filter books..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Book_ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="px-4 py-2">{book.id}</td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.category}</td>
                <td className="px-4 py-2">{book.availability ? "Available" : "Borrowed"}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => setShowPopup({ type: "edit", book })}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showPopup.type && (
        <PopupForm
          title={showPopup.type === "add" ? "Add Book" : "Edit Book"}
          initialData={showPopup.book}
          onClose={() => setShowPopup({ type: null, book: null })}
          onSubmit={handleSaveBook}
        />
      )}
    </div>
  );
};

const PopupForm = ({ title, initialData = {}, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null, // Keep id only if editing
    title: initialData?.title || "",
    author: initialData?.author || "",
    category: initialData?.category || "",
    availability: initialData?.availability ?? 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map(
            (key) =>
              key !== "id" && (
                <div key={key} className="mb-4">
                  <label className="block mb-1 text-gray-700 capitalize">{key}</label>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )
          )}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};


export default BooksPage;
