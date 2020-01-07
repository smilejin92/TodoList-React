import React from 'react';

const TodoList = props => {
  return (
    <ul className="todos">
      {props.children}
    </ul>
  );
};

export default TodoList;