import React from 'react';

const Todo = props => {
  const { 
    id, 
    content, 
    completed, 
    toggleCompleted,
    removeTodo
   } = props;
  return (
    <li id={id} className="todo-item">
      <input 
        className="custom-checkbox" 
        type="checkbox" 
        id={`ck-${id}`}
        checked={completed}
        onChange={e => toggleCompleted(id)}
      />
      <label htmlFor={`ck-${id}`}>{content}</label>
      <i 
        className="remove-todo far fa-times-circle" 
        onClick={e => removeTodo(id)}
      />
    </li>
  );
};

export default Todo;