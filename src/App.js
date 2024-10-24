import { useState } from 'react';
import './App.css';

const initialToDos = [
  {
    id: 1000,
    todo: "Write notes",
    checked: false,
  },
  {
    id: 1001,
    todo: "Vocalize",
    checked: false,
  },
  {
    id: 1002,
    todo: "Read my Bible",
    checked: false,
  },
];

export default function App() {
  const [toDos, setToDos] = useState(initialToDos);
  const [showForm, setShowForm] = useState(false);
  const numOfToDos = toDos.length;

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  function handleAddToDo(toDo) {
    setToDos((toDos) => [...toDos, toDo]);
  }

  function handleDelete(id) {
    setToDos(toDos.filter((todo) => todo.id !== id));
  }

  function handleToggleItem(id) {
    setToDos((toDos) => 
      toDos.map((todo) => 
        todo.id === id ? {...todo, checked: !todo.checked} 
        : todo
      )
    );
  }

  return (
    <div className="App">
      <Header onShowForm={handleShowForm} numOfToDos={numOfToDos} toDos={toDos} />
      {showForm && <FormAddToDo onAddToDo={handleAddToDo} onShowForm={handleShowForm} />}
      <ToDoList toDos={toDos} onDelete={handleDelete} onToggleItem={handleToggleItem} />
    </div>
  );
}

function Header({ toDos, onShowForm, numOfToDos,  }) {
  const num = toDos.filter((todo) => todo.checked !== false).length;

  return (
    <div className="header">
      <div>
        <h1>To-Do App</h1>
        <p>{num} completed of {numOfToDos} todos</p>
      </div>
      &nbsp;&nbsp;&nbsp;
      <div>
        <button className="btn-addtodo" onClick={onShowForm}>+</button>
      </div>
    </div>
  );
}

function FormAddToDo({ onAddToDo, onShowForm }) {
  const [toDo, setToDo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if(!toDo) return;

    const id = crypto.randomUUID();
    const newToDo = {
      id,
      todo: `${toDo}`,
      checked: false,
    };

    onAddToDo(newToDo);
    onShowForm();

    setToDo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={toDo} 
        onChange={(e) => setToDo(e.target.value)} 
      />
      <button type="submit">Add</button>
    </form>
  );
}

function ToDoList({ toDos, onToggleItem, onDelete }) {
  return (
    <div className="todo-display">
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" value={todo.checked} onChange={() => {onToggleItem(todo.id)}} />
            <span>{todo.todo}</span>
            <button onClick={() => onDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// function ToDoItem() {

// }

