import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    todos: [],
  };

  // Lifecycle
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        'http://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      this.setState({
        todos: data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // // adding Event (toggle complete)
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

  // // adding Event (delete todo)
  /*
  // delTodo using promise chaining
  delTodo = id => {
    axios
      .delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)],
        })
      )
      .catch(err => console.error(err));
  };
  */
  delTodo = async id => {
    try {
      axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)],
      });
    } catch (err) {
      console.error(err);
    }
  };

  // // adding Event (add todo)
  /*
  // addTodo using promise chaining
  addTodo = title => {
    axios
      .post('http://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      })
      .then(res =>
        this.setState({
          todos: [...this.state.todos, res.data],
        })
      )
      .catch(err => console.error(err));
  };
  */
  addTodo = async title => {
    try {
      const { data } = await axios.post(
        'http://jsonplaceholder.typicode.com/todos',
        { title, completed: false }
      );
      this.setState({
        todos: [...this.state.todos, data],
      });
    } catch (err) {
      console.error(err);
    }
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
