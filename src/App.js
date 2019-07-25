import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    todos: [],
  };

  // Lifecycle
  async componentDidMount() {
    const res = await axios.get(
      'http://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    const data = await res.data;
    // console.log(data);
    this.setState({
      todos: data,
    });
  }

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
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
