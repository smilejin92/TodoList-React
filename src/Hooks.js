import React, { useState, useEffect } from 'react';
import uuid from 'uuid';

import './Hooks.css';

function Hooks() {
  
  const [state, setState] = useState({
    todo: '',
    todos: [],
    allCompleted: false,
    nav: 'all'
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      todos: [
        { id: 1, content: 'HTML', completed: false },
        { id: 2, content: 'CSS', completed: true },
        { id: 3, content: 'Javascript', completed: false }
      ].sort((t1, t2) => t2.id - t1.id)
    }))
  }, []);

  const generateId = () => Math.max(0, ...state.todos.map(todo => todo.id)) + 1;

  const addTodo = keyCode => {
    if (keyCode !== 13 || !state.todo.trim()) return;
    setState(prev => ({
      ...prev,
      todo: '',
      todos: [
        {
          id: generateId(),
          content: prev.todo.trim(),
          completed: false
        },
        ...prev.todos
      ],
      allCompleted: false 
    }));
  };

  const toggleCompleted = id => {
    setState(prev => {
      const newTodos = prev.todos.map(todo => todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
      );
      const completed = newTodos.filter(({ completed }) => completed);
      return {
        ...prev,
        todos: newTodos,
        allCompleted: newTodos.length === completed.length
          ? true
          : false
      };
    });
  };

  const toggleAllCompleted = () => {
    setState(prev => ({
      ...prev,
      allCompleted: !prev.allCompleted,
      todos: prev.todos.map(todo => ({ ...todo, completed: !prev.allCompleted }))
    }));
  };

  const removeTodo = id => {
    setState(prev => {
      const newTodos = prev.todos.filter(todo => todo.id !== id);
      return {
        ...prev,
        todos: newTodos,
        allCompleted: newTodos.length
          ? prev.allCompleted
          : false
      };
    });
  };

  const removeCompleted = () => {
    setState(prev => {
      const newTodos = prev.todos.filter(({ completed }) => !completed);
      return {
        ...prev,
        todos: newTodos,
        allCompleted: newTodos.length
          ? prev.allCompleted
          : false
      };
    });
  };

  const toggleNav = target => {
    if (target.classList.contains('nav')) return;
    [...target.parentNode.children].forEach($li => {
      $li.classList.toggle('active', $li.id === target.id);
    });

    setState(prev => ({
      ...prev,
      nav: target.id
    }));
  };

  const completed = state.todos.filter(({ completed }) => completed).length;
  const incomplete = state.todos.length - completed;
  const _todos = state.nav === 'all'
    ? state.todos
    : state.nav === 'active'
      ? state.todos.filter(({ completed }) => !completed)
      : state.todos.filter(({ completed }) => completed)
  ;

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>

      <input 
        className="input-todo" 
        placeholder="What needs to be done?" 
        autoFocus 
        value={state.todo}
        onChange={({ target }) => setState(prev => ({
          ...prev,
          todo: target.value
        }))}
        onKeyUp={({ keyCode }) => addTodo(keyCode)}
      />
      <ul 
        className="nav"
        onClick={({ target }) => toggleNav(target)}
      >
        <li id="all" className="active">All</li>
        <li id="active">Active</li>
        <li id="completed">Completed</li>
      </ul>

      <ul className="todos">
        {
          _todos.map(({ id, content, completed }) => {
            return (
              <li key={uuid.v4()} id={id} className="todo-item">
                <input 
                  className="custom-checkbox" 
                  type="checkbox" 
                  id={`ck-${id}`} 
                  checked={completed}
                  onChange={() => toggleCompleted(id)}
                />
                <label htmlFor={`ck-${id}`}>{content}</label>
                <i 
                  className="remove-todo far fa-times-circle" 
                  onClick={() => removeTodo(id)}
                />
              </li>
            );
          })
        }
      </ul>
      <div className="footer">
        <div className="complete-all">
          <input 
            className="custom-checkbox" 
            type="checkbox" 
            id="ck-complete-all" 
            checked={state.allCompleted}
            onChange={() => toggleAllCompleted()}
          />
          <label htmlFor="ck-complete-all">Mark all as complete</label>
        </div>
        <div className="clear-completed">
          <button 
            className="btn"
            onClick={() => removeCompleted()}
          >
            Clear completed (<span className="completed-todos">{completed}</span>)
          </button>
          <strong className="active-todos">{incomplete}</strong> items left
        </div>
      </div>
    </div>
  );
}

export default Hooks;