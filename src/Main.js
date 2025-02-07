import { useEffect, useState } from "react";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";

function Main() {
  const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem("tasks");
    if (!storedTodos) {
      return [];
    } else {
      return JSON.parse(storedTodos);
    }
  });
  const [tasksTitle, setTasksTitle] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (e) => {
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks([
        ...storedTodos,
        {
          id: uuidv4(),
          title: tasksTitle,
          status: false,
        },
      ]);
      setTasksTitle("");
    }
  };
  const date = new Date();
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = dayNames[date.getDay()];
  const month = monthName[date.getMonth()];
  const number = date.getDate();
  const year = date.getFullYear();
  return (
    <div className="container">
      <h1>Note your task</h1>
      <span>{day + ", " + month + " " + number + ", " + year}</span>
      <div className="input-filed">
        <input
          type="text"
          value={tasksTitle}
          onChange={(event) => setTasksTitle(event.target.value)}
          onKeyDown={addTask}
        />
        <label>Task name</label>
      </div>
      <List tasks={tasks} />
    </div>
  );
}

export default Main;
