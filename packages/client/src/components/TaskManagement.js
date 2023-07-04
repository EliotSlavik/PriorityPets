import React, { useState, useEffect } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import "./TaskManagement.css";
import axios from "../util/axiosConfig";

const bgColor = ["khaki", "orange", "orangered"];
function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [reminder, setReminder] = useState(new Date());
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  // Edit modal state
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDueDate, setEditDueDate] = useState(null);
  const [editReminder, setEditReminder] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleAddTask = () => {
    const newTask = {
      name,
      description,
      priority,
      category,
      dueDate,
      reminder,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    //put axios logic here
    axios
      .post("/tasks", newTask)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        //onError(error);
      });
    //end axios logic

    // Clear input fields
    setName("");
    setDescription("");
    setPriority("");
    setDueDate(null);
    setReminder(new Date());
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed; // Toggle the completed value back and forth
    setTasks(updatedTasks);
  };

  // Edit task
  const handleEditTask = () => {
    const updatedTasks = [...tasks];
    const editedTask = {
      ...updatedTasks[editIndex],
      name: editName,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate,
      reminder: editReminder,
    };
    updatedTasks[editIndex] = editedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
    setShowEditModal(false);
    setEditName("");
    setEditDescription("");
    setEditPriority("");
    setEditDueDate(null);
    setEditReminder(new Date());
  };

  const openEditModal = (index) => {
    const task = tasks[index];
    setEditIndex(index);
    setEditName(task.name);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
    setEditReminder(task.reminder);
    setShowEditModal(true);
  };

  useEffect(() => {
    tasks.forEach((task) => {
      if (!task.completed && task.reminder && task.dueDate) {
        const now = moment();
        const reminderTime = moment(task.dueDate).subtract(moment(task.reminder).hours(), "hours").subtract(moment(task.reminder).minutes(), "minutes");
        if (now.isSameOrAfter(reminderTime)) {
          setTimeout(() => {
            alert(`Reminder: ${task.name}`);
          }, reminderTime.diff(now));
        }
      }
    });
  }, [tasks]);

  return (
    <>
      <div className="div-card2" >
        <Button className="modalButton" onClick={openModal}>
          Add Task
        </Button>
        <Modal className="modal" show={show} onHide={closeModal}  >
          <Modal.Header closeButton style={{marginBottom: "-60px", backgroundColor: "green", fontSize: "30px"}}></Modal.Header>
          <div
            className="container mt-5"
            style={{
              backgroundColor: "green",
              borderRadius: "20px",
              marginBottom: "-580px"
            }}
          >
            <h1 className="mb-4" style={{ color: "white" }}>
              Task Manager
            </h1>
            <div className="mb-3">
              <input type="text" className="form-control mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <select className="form-control mb-2" name="Priority" onChange={(e) => setPriority(e.target.value)}>
                <option value="">Priority</option>
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
              <span className="dueDateSpan">Set Due Date</span>
              <DateTimePicker className="form-control mb-2 datePicker" value={dueDate} onChange={(date) => setDueDate(date)} placeholder="Due Date" />
              <span className="dueDateSpan">Set Reminder</span>
              <DateTimePicker className="form-control mb-2 datePicker"  value={reminder} onChange={(date) => setReminder(date)} placeholder="Reminder" />
              <Button className="float-right mt-3" style={{ borderRadius: "10px"}} onClick={handleAddTask}>
                Add Task
              </Button>
              <Button className="float-right mt-3" style={{ marginLeft: "20px", borderRadius: "10px"}} onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        {tasks.map((task, index) => (
          <div key={index} className="listDiv">
            <ol>
              <li
                className="task"
                style={{
                  backgroundColor: bgColor[task.priority],
                }}
              >
                <div className="holder">
                  {
                    //removed the code that crosses out the check box
                    <input type="checkbox" name="completed" className="completed" checked={task.completed} onChange={() => handleCompleteTask(index)} />
                  }
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginLeft: "5px",
                    }}
                  >
                    Complete
                  </span>
                  <h2
                    className="name"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "gray" : "black", // completed changes colors so people can tell
                    }}
                  >
                    {task.name}
                  </h2>
                  {task.description && <div className="description main">{task.description}</div>}
                  <br></br>
                  <div className="main">
                    <span className="priority">Priority: </span>
                    <br></br>
                    <span className="para">Due: {task.dueDate ? moment(task.dueDate).format("ddd MMM DD 'YY h:mm") : "-"}</span>
                    <br></br>
                    <span className="para">REM: {task.reminder ? moment(task.reminder).format("ddd MMM DD 'YY h:mm") : "-"}</span>
                    <button className="edit-button"  onClick={() => openEditModal(index)}>
                      Edit
                    </button>

                    <Modal //edit task modal
                      className="modal"
                      show={showEditModal}
                      onHide={() => setShowEditModal(false)}
                    >
                      <Modal.Header closeButton style={{backgroundColor: "green", fontSize: "30px", marginBottom: "-70px"}}></Modal.Header>
                      <div
                        className="container mt-5"
                        style={{
                          backgroundColor: "green",
                          borderRadius: "20px",
                          marginBottom: "-650px",
                        }}
                      >
                        <h1 className="mb-4" style={{ color: "white" }}>
                          Edit Task
                        </h1>
                        <div className="mb-3">
                          <input type="text" className="form-control mb-2" placeholder="Name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                          <textarea className="form-control mb-2" placeholder="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                          <select className="form-control mb-2" name="Priority" value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                            <option value="">Priority</option>
                            <option value={0}>Low</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                          </select>
                          <span className="dueDateSpan">Set Due Date</span>
                          <DateTimePicker className="form-control mb-2 datePicker" value={editDueDate} onChange={(date) => setEditDueDate(date)} placeholder="Due Date" />
                          <span className="dueDateSpan">Set Reminder</span>
                          <DateTimePicker className="form-control mb-2 datePicker" value={editReminder} onChange={(date) => setEditReminder(date)} placeholder="Reminder" />
                          <Button className="float-right mt-3" onClick={handleEditTask}>
                            Save Changes
                          </Button>
                          <Button className="float-right mt-3" style={{ marginLeft: "20px" }} onClick={() => setShowEditModal(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Modal>

                    <Button className="btn btn-danger deleteButtonTask" style={{ marginLeft: "30px", borderRadius: "10px", fontSize: "larger", marginBottom: "5px"}} onClick={() => handleDeleteTask(index)}>
                      Delete Task
                    </Button>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskManagement;
