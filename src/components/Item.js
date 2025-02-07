import { useState } from "react";

const Item = ({ title, id, status }) => {
  const [checked, setChecked] = useState(status);
  const classes = ["todo"];
  if (checked) {
    classes.push("status");
  }
  const updateStatus = () => {
    setChecked(!checked);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    storedTodos.map((el) => {
      if (el.id === id) {
        el.status = !checked;
      }
      return true;
    });
    localStorage.setItem("tasks", JSON.stringify(storedTodos));
  };
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    const removeTask = storedTodos.filter((element) => {
      if (element.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem("tasks", JSON.stringify(removeTask));
  };

  return (
    <>
      {visible && (
        <li className={classes.join(" ")}>
          <label>
            <input type="checkbox" checked={checked} onChange={updateStatus} />
            <span>{title}</span>
            <div className="item">
              <i
                onClick={(e) => removeElement(e.target.value)}
                className="material-icons red-text">
                X
              </i>
            </div>
          </label>
        </li>
      )}
    </>
  );
};

export default Item;
