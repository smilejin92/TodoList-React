import React from 'react';

const Footer = props => {

  const { 
    allCompleted, 
    toggleAllCompleted, 
    removeCompleted,
    completed,
    incomplete
  } = props;

  return (
    <div className="footer">
      <div className="complete-all">
        <input 
          className="custom-checkbox" 
          type="checkbox" 
          id="ck-complete-all" 
          checked={allCompleted} 
          onChange={toggleAllCompleted}  
        />
        <label htmlFor="ck-complete-all">Mark all as complete</label>
      </div>
      <div className="clear-completed">
        <button 
          className="btn"
          onClick={removeCompleted}
        >
          Clear completed (<span className="completed-todos">{completed}</span>)
        </button>
        <strong className="active-todos">{incomplete}</strong> items left
      </div>
    </div>
  );
};

export default Footer;