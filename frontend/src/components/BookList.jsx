import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaCheckCircle,
  FaBook,
} from "react-icons/fa";
import "./BookList.css";

function BookList({
  books,
  onEdit,
  onDelete,
  search,
  setSearch,
}) {
  return (
    <div className="book-list-card">
      <div className="book-list-header">
        <div>
          <h2>
            <FaBook /> Library Books
          </h2>

          <p className="book-count">
            {books.length} {books.length === 1 ? "book" : "books"} found
          </p>
        </div>

        <div className="search-wrapper">
          <FaSearch className="search-icon" />

          <input
            type="text"
            className="search-box"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {books.length === 0 ? (
        <div className="no-books">
          <FaBook />

          <h3>No books found</h3>

          <p>
            {search
              ? "Try searching with a different title or author."
              : "Add your first book to the library."}
          </p>
        </div>
      ) : (
        <div className="book-table-wrapper">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="book-title">{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.category}</td>

                  <td>
                    <span
                      className={`status ${
                        book.status === "Available"
                          ? "status-available"
                          : "status-issued"
                      }`}
                    >
                      <FaCheckCircle />
                      {book.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => onEdit(book)}
                        title="Edit book"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => onDelete(book._id)}
                        title="Delete book"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookList;