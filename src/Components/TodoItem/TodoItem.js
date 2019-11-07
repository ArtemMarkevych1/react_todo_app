import React from 'react';
import cx from 'classnames';
import { TodoItemProps } from '../PropTypes/PropTypes';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    editedTitle: this.props.todoTitle,
  }

  handleDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  }

  handleChangeEdit = () => {
    this.setState({
      isEditing: false,
    });
  }

  onEditChange = ({ target }) => {
    this.setState({
      editedTitle: target.value,
    });
  }

  handleEditSubmit = () => {
    const {
      handleDoubleClickEditTitle,
      todoId,
      handleDeleteTodo,
    } = this.props;
    const { editedTitle } = this.state;

    this.setState({
      isEditing: false,
    });
    if (editedTitle !== '') {
      handleDoubleClickEditTitle(editedTitle, todoId);
    } else {
      handleDeleteTodo(todoId);
    }
  }

  render() {
    const {
      todoTitle,
      todoStatus,
      todoId,
      handleTodoStatus,
      handleDeleteTodo,
    } = this.props;
    const { editedTitle } = this.state;
    const liClassName = cx({
      editing: this.state.isEditing,
      completed: todoStatus,
    });

    return (
      <li className={liClassName}>
        { !this.state.isEditing
          ? (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={todoId}
                checked={todoStatus}
                onChange={() => handleTodoStatus(todoId)}
              />
              <p
                className="label"
                onDoubleClick={this.handleDoubleClick}
                htmlFor={todoId}
              >
                {todoTitle}
              </p>
              <button
                type="button"
                className="destroy"
                onClick={() => handleDeleteTodo(todoId)}
              />
            </div>
          )
          : (
            <form
              onSubmit={this.handleEditSubmit}
            >
              <input
                type="text"
                className="edit"
                value={editedTitle}
                onChange={e => this.onEditChange(e)}
                onBlur={this.handleChangeEdit}
                autoFocus
              />
            </form>
          )
        }
      </li>
    );
  }
}

TodoItem.propTypes = TodoItemProps;

export default TodoItem;