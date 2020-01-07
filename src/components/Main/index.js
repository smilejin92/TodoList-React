import React, { Component } from 'react';
import uuid from 'uuid';

import './style.css';
import Input from '../Input';
import Nav from '../Nav';
import TodoList from '../TodoList';
import Todo from '../Todo';
import Footer from '../Footer';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  addTodo = todo => {
    // console.log('addTodo');
    if (!todo.trim()) return;
    
    this.setState(prevState => ({
      list: [
        { 
          id: this.generateId(), 
          content: todo.trim(), 
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
    const { list, allCompleted, nav } = this.state;
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
          <Input addTodo={this.addTodo} />
          <Nav toggleNav={this.toggleNav} />
          <TodoList>
            {
              _list.map(({ id, content, completed }) =>
                <Todo
                  key={uuid.v4()}
                  id={id}
                  content={content}
                  completed={completed}
                  toggleCompleted={this.toggleCompleted}
                  removeTodo={this.removeTodo}
                />
              )
            }
          </TodoList>

          <Footer 
            allCompleted={allCompleted}
            toggleAllCompleted={this.toggleAllCompleted}
            removeCompleted={this.removeCompleted}
            completed={completed}
            incomplete={incomplete}
          />
      </div>
    );
  }
}

export default Main;
