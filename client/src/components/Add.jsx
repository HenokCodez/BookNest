import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Add() {
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", description: "", cover: "" });
  //post
  const handleClick = () => {
    axios
      .post("http://localhost:3000/add", book)
      .then((response) => {
        console.log("Response:", response.data);
        navigate("/");
        // Reload the page to reflect the changes
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="createContainer">
      <h1>Add New Book</h1>
      <div className="addInfo">
        <input type="text" className="titleInput" placeholder="Title" onChange={(e) => setBook((prev) => ({ ...prev, title: e.target.value }))} />
        <input type="text" className="descriptionInput" placeholder="Description" onChange={(e) => setBook((prev) => ({ ...prev, description: e.target.value }))} />
        <input type="text" className="imgUrl" placeholder="URL" onChange={(e) => setBook((prev) => ({ ...prev, cover: e.target.value }))} />
        <button className="addBtn" onClick={handleClick}>
          Add
        </button>
        <Link to={"/"} className="linkToHome">
          See all books
        </Link>
      </div>
    </div>
  );
}
