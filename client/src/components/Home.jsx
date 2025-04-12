import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // usage: navigate("/path")
  //read
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log("failed to fetch data", err));
  }, []);
  //delete
  async function handleDelete(id) {
    return axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => console.log("Book deleted successfully!"))
      .catch((error) => console.error("Error deleting book:", error));
  }

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
                <p>{book.description}</p>
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
