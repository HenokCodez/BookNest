import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // usage: navigate("/path")
  const MAX_DESCRIPTION_LENGTH = 100; // Set maximum length for description

  // Read
  useEffect(() => {
    axios
      .get("https://booknest-ef77.onrender.com/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log("failed to fetch data", err));
  }, []);

  // Delete
  async function handleDelete(id) {
    return axios
      .delete(`https://booknest-ef77.onrender.com/books/${id}`)
      .then(() => console.log("Book deleted successfully!"))
      .catch((error) => console.error("Error deleting book:", error));
  }

  // Truncate description if longer than MAX_DESCRIPTION_LENGTH
  const truncateDescription = (text) => {
    if (text.length > MAX_DESCRIPTION_LENGTH) {
      return text.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return text;
  };

  return (
    <div className="container">
      <h1 className="webTitle">BookNest</h1>
      <div className="bookContainer">
        {books.map((book) => {
          return (
            <div className="singleBookContainer" key={book.id}>
              <div className="cover">
                <img src={book.cover} alt="book cover" />
              </div>
              <div className="bookInfo">
                <h3>{book.title}</h3>
                <p>{truncateDescription(book.description)}</p>
                <div className="buttonContainer">
                  <button
                    className="delete"
                    onClick={() => {
                      handleDelete(book.id);
                      // Reload the page to reflect the changes
                      window.location.reload();
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${book.id}`}>
                    <button className="update">Update</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/add">
        <button className="add">Add new book</button>
      </Link>
    </div>
  );
}

export default Home;
