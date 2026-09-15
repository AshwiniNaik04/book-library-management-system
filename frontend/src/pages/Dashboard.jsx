import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchBooks = async (searchText = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books?search=${encodeURIComponent(
          searchText
        )}`
      );

      const data = await response.json();

      if (response.ok) {
        setBooks(data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        alert("Failed to delete book");
        return;
      }

      fetchBooks(search);
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  const handleBookSaved = () => {
    setEditingBook(null);
    fetchBooks(search);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="dashboard-content">
        <div className="dashboard-heading">
          <h1>Manage Books</h1>

          <p>
            Add, edit, search and manage your library books.
          </p>
        </div>

        <BookForm
          editingBook={editingBook}
          onBookSaved={handleBookSaved}
        />

        <BookList
          books={books}
          onEdit={setEditingBook}
          onDelete={handleDelete}
          search={search}
          setSearch={setSearch}
        />
      </main>
    </div>
  );
}

export default Dashboard;