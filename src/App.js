import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      list: [],
      allCompleted: false,
      nav: 'all'
    };
  }

  componentDidMount() {
    // console.log('componentDidMount');
    const list = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];

    this.setState({ 
      list: list.sort((a, b) => b.id - a.id) 
    });
  }

  generateId = () => Math.max(0, ...this.state.list.map(todo => todo.id)) + 1;

  toggleCompleted = id => {
    // console.log('toggleCompleted ' + id);
    this.setState(prevState => {
      const list = prevState.list.map(todo => todo.id === id 
        ? { ...todo, completed: !todo.completed } 
        : todo
      );
      const completed = list.filter(({ completed }) => completed);
      return {
        list,
        allCompleted: completed.length === list.length ? true : false
      };
    });
  }

  toggleAllCompleted = () => {
    // console.log('toggleAllCompleted');
    this.setState(prevState => ({
      list: prevState.list.map(todo => ({ ...todo, completed: !prevState.allCompleted })),
      allCompleted: !prevState.allCompleted
    }));
  }

  removeTodo = id => {
    // console.log('removeTodo ' + id);
    this.setState(prevState => {
      const list = prevState.list.filter(todo => todo.id !== id);
      const completed = list.filter(({ completed }) => completed);
      let len = true;

      if (!list.length) len = false;

      return {
        list,
        allCompleted: len 
          ? completed.length === list.length 
            ? true 
            : prevState.allCompleted
          : false
      };
    });
  }

  removeCompleted = () => {
    // console.log('removeCompleted');
    this.setState(prevState => {
      const list = prevState.list.filter(({ completed }) => !completed);
      return { 
        list,
        allCompleted: list.length 
          ? prevState.allCompleted 
          : false
      };
    });
  }

  setTodo = text => {
    // console.log('setTodo');
    this.setState({
      todo: text
    });
  }

  addTodo = keyCode => {
    // console.log('addTodo');
    if (keyCode !== 13 || !this.state.todo.trim()) return;
    
    this.setState(prevState => ({
      todo: '',
      list: [
        { 
          id: this.generateId(), 
          content: prevState.todo, 
          completed: false 
        },
        ...prevState.list
      ]
    }));
  }

  toggleNav = target => {
    // console.log('toggleNav');
    if (target.classList.contains('nav')) return;
    
    [...target.parentNode.children].forEach($li => {
      $li.classList.toggle('active', $li.id === target.id)
    });
    
    this.setState({
      nav: target.id
    });
  }

  render() {
    // console.log('render');
    const { todo, list, allCompleted, nav } = this.state;
    const completed = list.filter(({ completed }) => completed).length;
    const incomplete = list.length - completed;
    const _list = nav === 'all'
      ? list
      : nav === 'completed' 
        ? list.filter(({ completed }) => completed)
        : list.filter(({ completed }) => !completed);

    return (
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">2.0</div>
          <input 
            className="input-todo" 
            placeholder="What needs to be done?" 
            autoFocus
            value={todo}
            onChange={({ target }) => this.setTodo(target.value)} 
            onKeyUp={({ keyCode }) => this.addTodo(keyCode)}
          />
          <ul 
            className="nav"
            onClick={({ target }) => this.toggleNav(target)}
          >
            <li id="all" className="active">All</li>
            <li id="active">Active</li>
            <li id="completed">Completed</li>
          </ul>

          <ul className="todos">
            {
              _list.map(({ id, content, completed }) => {
                return (
                  <li id={id} className="todo-item" key={uuid.v4()}>
                    <input 
                      className="custom-checkbox" 
                      type="checkbox" 
                      id={`ck-${id}`}
                      checked={completed}
                      onChange={e => this.toggleCompleted(id)}
                    />
                    <label htmlFor={`ck-${id}`}>{content}</label>
                    <i 
                      className="remove-todo far fa-times-circle" 
                      onClick={e => this.removeTodo(id)}
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
                checked={allCompleted} 
                onChange={this.toggleAllCompleted}  
              />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button 
                className="btn"
                onClick={this.removeCompleted}
              >
                Clear completed (<span className="completed-todos">{completed}</span>)
              </button>
              <strong className="active-todos">{incomplete}</strong> items left
            </div>
          </div>
      </div>
    );
  }
}

export default App;
