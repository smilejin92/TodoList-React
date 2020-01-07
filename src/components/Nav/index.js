import React from 'react';

const Nav = props => {
  const { toggleNav } = props;
  return (
    <ul 
      className="nav"
      onClick={({ target }) => toggleNav(target)}
    >
      <li id="all" className="active">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>
  );
};

export default Nav;