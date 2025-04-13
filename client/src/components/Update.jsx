import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const [updatedBook, setUpdatedBook] = useState({ title: "", description: "", cover: "" });
  const { id } = useParams();

  async function handleUpdate(id, updatedBook) {
    return axios
      .put(`https://booknest-ef77.onrender.com/books/${id}`, updatedBook)
      .then(() => console.log("Book updated successfully!"))
      .catch((error) => console.error("Error updating book:", error));
  }
  return (
    <div className="createContainer">
      <h1>Update The Book</h1>
      <div className="addInfo">
        <input type="text" className="titleInput" placeholder="Title" onChange={(e) => setUpdatedBook((prev) => ({ ...prev, title: e.target.value }))} />
        <input type="text" className="descriptionInput" placeholder="Description" onChange={(e) => setUpdatedBook((prev) => ({ ...prev, description: e.target.value }))} />
        <input type="text" className="imgUrl" placeholder="URL" onChange={(e) => setUpdatedBook((prev) => ({ ...prev, cover: e.target.value }))} />
        <button
          className="addBtn"
          onClick={() => {
            handleUpdate(id, updatedBook);
            navigate("/");
            // Reload the page to reflect the changes
            window.location.reload();
          }}
        >
          Update
        </button>
        <Link to={"/"} className="linkToHome">
          See all books
        </Link>
      </div>
    </div>
  );
}
