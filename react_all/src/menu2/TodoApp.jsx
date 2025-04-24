
import React, { useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const newTasks = tasks.slice();
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Teendők</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTask}>Hozzáadás</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.text}
            <button onClick={() => toggleTask(index)}>✔</button>
            <button onClick={() => removeTask(index)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
