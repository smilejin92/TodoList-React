import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: '' };
  }

  render() {
    const { addTodo } = this.props;
    const { todo } = this.state;
    return (
      <input 
        className="input-todo" 
        placeholder="What needs to be done?" 
        autoFocus
        value={todo}
        onChange={({ target }) => this.setState({ todo: target.value})} 
        onKeyUp={({ keyCode }) => {
          if (keyCode !== 13) return;
          addTodo(todo);
          this.setState({ todo: '' });
        }}
      />
    );
  }
};

export default Input;