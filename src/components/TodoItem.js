import React from 'react';

const TodoItem = props => {
  return (
    <div>
      <p>{props.todo.title}</p>
    </div>
  );
};

export default TodoItem;
