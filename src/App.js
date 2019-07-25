import React, { Component } from 'react';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false,
      },
      {
        id: uuid.v4(),
        title: 'Dinner with friends',
        completed: false,
      },
      {
        id: uuid.v4(),
        title: 'Meeting with client',
        completed: false,
      },
    ],
  };

  // adding Event (toggle complete)
  // passing down markComplete as props to Todos.js
  // Todos component passes down markComplete as props to TodoItem.js
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // adding Event (delete todo)
  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  // adding Event (add todo)
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
