import React, { useState } from 'react';

function TodoListApp() {
  const [tasks, setTasks] = useState(mytasks());
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Each task now includes a completed status
  function mytasks() {
    var t1 = { text: "🧑‍💻 Learn React", completed: false };
    var t2 = { text: "🎮 Play videogames", completed: false };
    var t3 = { text: "🏋️ Gym", completed: false };
    const t4 = { text: "🍴 Eat", completed: false };
    const t5 = { text: "😴 Sleep", completed: false };
    return [t1, t2, t3, t4, t5];
  }

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addNewTaks() {
    if (newTask.trim() !== "") {
      setTasks(prevTasks => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  }

  function deleteTasks(index) {
    setTasks(prevTasks => prevTasks.filter((task, i) => i !== index));
  }

  function setPriorityUP(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function setPriorityDOWN(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  }

  function saveEdit() {
    if (editingText.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editingText;
      setTasks(updatedTasks);
    }
    setEditingIndex(null);
    setEditingText("");
  }

  // Function to toggle the completed status on double-click
  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  return (
    <>
      <div className='to_do_list'>
        <h1 className='hederText'>To do list</h1>
        <div>
          <input className="textWidget" type="text" placeholder='Enter New Task' value={newTask} onChange={handleInputChange} />
          <button onClick={addNewTaks} type="submit" className='button_add_task'>New task ➕</button>
        </div>
        <ol>
          {tasks.map((task, index) => (
            <li key={index} onDoubleClick={() => toggleComplete(index)} className="task-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  className="editTEXT"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveEdit} className="editTasks">✅</button>
              </>
            ) : (
              <span className={`textTasks ${task.completed ? 'completed' : ''}`}>{task.text}</span> // Apply 'completed' class only to the task text
            )}
            <button onClick={() => startEditing(index)} className="editTasks" disabled={editingIndex !== null}> ✏️ </button>
            <button onClick={() => deleteTasks(index)} className="deleteTasks" disabled={editingIndex !== null}> ❌ </button>
            <button onClick={() => setPriorityUP(index)} className="PriorityUPTasks" disabled={editingIndex !== null}> ⬆️ </button>
            <button onClick={() => setPriorityDOWN(index)} className="PriorityDownTasks" disabled={editingIndex !== null}> ⬇️ </button>
          </li>
          
          ))}
        </ol>
      </div>
    </>
  );
}

export default TodoListApp;
