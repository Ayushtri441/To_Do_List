import React, { useEffect, useState } from "react";

import "./index.css";
const Body = () => {
  const [data, setData] = useState({
    todo: [],
    completed: [],
  });
  const [task, settask] = useState("");
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("todoList"));
    if (savedData) {
      setData(savedData);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(data));
    console.log(data);
  }, [data]);
  //add
  const addItem = () => {
    const updatedData = { ...data };
    if (task != "") updatedData.todo.push(task);
    else alert("Enter some Task");
    document.getElementById("item").value = "";
    settask("");
    setData(updatedData);
  };
  //remove
  const removeItem = (id, value) => {
    const updatedData = { ...data };
    const list = updatedData[id];
    list.splice(list.indexOf(value), 1);
    setData(updatedData);
  };
  // complete
  const completeItem = (id, value) => {
    const updatedData = { ...data };
    const todoList = updatedData["todo"];
    const completedList = updatedData["completed"];

    const todoIndex = todoList.indexOf(value);
    if (todoIndex !== -1) {
      todoList.splice(todoIndex, 1);
      completedList.push(value);
    } else {
      const completedIndex = completedList.indexOf(value);
      completedList.splice(completedIndex, 1);
      todoList.push(value);
    }

    setData(updatedData);
  };

  const renderListItem = (value, id) => (
    <li key={value}>
      <div className="value">{value}</div>
      <div className="buttons">
        <button className="remove" onClick={() => removeItem(id, value)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
        </button>
        <button className="complete" onClick={() => completeItem(id, value)}>
          {id === "todo" ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192 144 128C0 92.7 28.7 64 64 64h40V24c0-13.3 10.7-24 24-24zM400 192H48V448c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V192zM329 297L217 409c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 95-95c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M160 0c13.3 0 24 10.7 24 24V64H328V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h40c35.3 0 64 28.7 64 64v16 48V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V192 144 128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zM432 192H80V448c0 8.8 7.2 16 16 16H416c8.8 0 16-7.2 16-16V192zm-95 89l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
            </svg>
          )}
        </button>
      </div>
    </li>
  );

  return (
    <div>
      <div className="container">
        <div className="heading"> My Todo List</div>
        <div className="input">
          <input
            type="text"
            placeholder="Add a new Todo.."
            id="item"
            onChange={(e) => settask(e.target.value)}
          />
          <button id="add" onClick={addItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        </div>
        <ul className="todo" id="todo">
          {" "}
          {data.todo.map((value) => renderListItem(value, "todo"))}
        </ul>
        <div className="info">Completed Tasks</div>
        <ul className="todo" id="completed">
          {data.completed.map((value) => renderListItem(value, "completed"))}
        </ul>
      </div>
    </div>
  );
};

export default Body;
