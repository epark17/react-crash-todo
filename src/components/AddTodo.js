import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  state = {
    title: '',
  };

  handleChange = e =>
    this.setState({
      /*
      title: e.target.value
      this is fine, however, if we have more than more field in the state, you don't want to create a separate handChange for every field so can use [] and as long as the name attribute in the input tag is equal to the say "title" in state will work
      */
      [e.target.name]: e.target.value,
    });

  handleSubmit = e => {
    /*
    Since it's submit, just like vanilla JS it's going to try submit to actual file, and we want to stop that or prevent that
    */
    e.preventDefault();
    this.props.addTodo(this.state.title);
    // then we would want to clear the field
    this.setState({ title: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Todo..."
        />
        <input
          type="submit"
          value="submit"
          className="btn"
          style={{ flex: '1' }}
        />
      </form>
    );
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
