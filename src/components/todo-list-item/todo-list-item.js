import React from 'react';

import './todo-list-item.css';


export default class TodoListItem extends React.Component {

  render() {

    const { label, onDeleted, onToggleImportant, onToggleDone, done, important} = this.props;

    let classNames = 'todo-list-item';

    if(done) {
      classNames += ' done'
    }

    if(important) {
      classNames += ' important'
    }

    const style = {
      color: important ? 'steelblue' : 'black',
      fontWeight: important ? 'bold' : 'normal'
    };

    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          style={style}
          onClick={onToggleDone}>
          {label}
        </span>

        <button onClick={onToggleImportant} type="button"
                className="btn btn-outline-success btn-sm float-right">
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
                onClick={onDeleted}
                className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  };
}
