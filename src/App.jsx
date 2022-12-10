// @author: Amir Armion
// @version: V.01

import React, { useState } from "react";
import { useStore } from "./store";
import "./App.css";

export default function App() 
{
  const { books, addBook, removeBook, updateBook, setRead } = useStore();

  const [input, setInput]                 = useState("");
  const [activeAll, setActiveAll]         = useState(true);
  const [activeRead, setActiveRead]       = useState(false);
  const [activeReading, setActiveReading] = useState(false);
  const [isEdit, setIsEdit]               = useState(false);
  const [update, setUpdate]               = useState({
    id: null,
    name: "",
    isRead: false
  });

  const addBookHandler = (e) => {
    e.preventDefault();
    addBook(input);
    setInput("");
  };

  const crossLine = (e) => {
    const element = e.target;
    element.classList.toggle("crossed-line");
};

  const updateClickHandler = (book) => {
    setIsEdit(true);
    setUpdate({
      id: book.id,
      name: book.name
    });
  };

  const updateBookHandler = (e) => {
    e.preventDefault();
    updateBook(update);
    setUpdate({
      id: null,
      name: "",
      isRead: false
    });
    setIsEdit(false);
  };

  return (
    <div>
      <h1>Book List</h1>

      {/* Input */}
      <div style={{ display: "flex" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add New Book"
        />
        <button onClick={addBookHandler}>Add</button>
      </div>

      <br />

      {/* Showing Books */}
      {books.map((book) => {
        if(activeAll && !activeRead && !activeReading)
        {
          if(book.isRead)
          {
            return (
              <div key={book.id}>
                <h2 className="crossed-line" 
                    onClick={(e) => {
                      setRead(book.id);
                      crossLine(e);
                }}>{book.name}</h2>
                <button onClick={() => removeBook(book.id)}>
                  <i className="ti ti-trash"></i>
                </button>{" "}
                <button onClick={() => updateClickHandler(book)}>
                  <i className="ti ti-edit-circle"></i>
                </button>
              </div>
              );
          }
          else
          {
            return (
              <div key={book.id}>
                <h2 onClick={(e) => {
                      setRead(book.id);
                      crossLine(e);
                  }}>{book.name}</h2>
                <button onClick={() => removeBook(book.id)}>
                  <i className="ti ti-trash"></i>
                </button>{" "}
                <button onClick={() => updateClickHandler(book)}>
                  <i className="ti ti-edit-circle"></i>
                </button>
              </div>
              );            
          }
        }
        else if(!activeAll && activeRead && !activeReading)
        {
          if(book.isRead)
          {
            return (
              <div key={book.id}>
                <h2 className="crossed-line" 
                    onClick={(e) => {
                      setRead(book.id);
                      crossLine(e);
                }}>{book.name}</h2>
                <button onClick={() => removeBook(book.id)}>
                  <i className="ti ti-trash"></i>
                </button>{" "}
                <button onClick={() => updateClickHandler(book)}>
                  <i className="ti ti-edit-circle"></i>
                </button>
              </div>
              );
          }
        }
        else if(!activeAll && !activeRead && activeReading)
        {
          if(!book.isRead)
          {
            return (
              <div key={book.id}>
                <h2 onClick={(e) => {
                      setRead(book.id);
                      crossLine(e);
                  }}>{book.name}</h2>
                <button onClick={() => removeBook(book.id)}>
                  <i className="ti ti-trash"></i>
                </button>{" "}
                <button onClick={() => updateClickHandler(book)}>
                  <i className="ti ti-edit-circle"></i>
                </button>
              </div>
              );
          }
        }

        return null;
      })}

      <br />

      {/* Three Buttons: Read, Reading, All */}
      <button onClick={() => {
        setActiveAll(false);
        setActiveRead(true);
        setActiveReading(false);
        } 
      }>Read</button>
      <button onClick={() => {
        setActiveAll(false);
        setActiveRead(false);
        setActiveReading(true);
        } 
      }>Reading</button>
      <button onClick={() => {
        setActiveAll(true);
        setActiveRead(false);
        setActiveReading(false);
        } 
      }>All</button>

      <br />

      {/* Edit */}
      {isEdit && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <br />
          <label>Updating Book:</label>
          <div style={{ display: "flex" }}>
            <input
              value={update.name}
              onChange={(e) => setUpdate({ ...update, name: e.target.value })}
            />
            <button onClick={updateBookHandler}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}
