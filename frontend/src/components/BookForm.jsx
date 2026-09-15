import { useEffect, useState } from "react";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import "./BookForm.css";

function BookForm({ editingBook, onBookSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    status: "Available",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category,
        status: editingBook.status,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        category: "",
        status: "Available",
      });
    }

    setMessage("");
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = editingBook
        ? `http://localhost:5000/api/books/${editingBook._id}`
        : "http://localhost:5000/api/books";

      const method = editingBook ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to save book");
        return;
      }

      setMessage(
        editingBook
          ? "Book updated successfully!"
          : "Book added successfully!"
      );

      setFormData({
        title: "",
        author: "",
        category: "",
        status: "Available",
      });

      setTimeout(() => {
        setMessage("");
        onBookSaved();
      }, 700);
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      author: "",
      category: "",
      status: "Available",
    });

    setMessage("");
    onBookSaved();
  };

  return (
    <div className="book-form-card">
      <h2>
        {editingBook ? (
          <>
            <FaSave /> Edit Book
          </>
        ) : (
          <>
            <FaPlus /> Add New Book
          </>
        )}
      </h2>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <button type="submit">
          {editingBook ? (
            <>
              <FaSave /> Update Book
            </>
          ) : (
            <>
              <FaPlus /> Add Book
            </>
          )}
        </button>

        {editingBook && (
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            <FaTimes /> Cancel
          </button>
        )}
      </form>

      {message && <p className="book-form-message">{message}</p>}
    </div>
  );
}

export default BookForm;