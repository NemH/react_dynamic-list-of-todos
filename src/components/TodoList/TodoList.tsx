import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  isActive: number | null;
  setIsActive: React.Dispatch<React.SetStateAction<number | null>>;
  query: string;
  status: 'all' | 'active' | 'completed';
};

export const TodoList: React.FC<Props> = ({
  todos,
  isActive,
  setIsActive,
  query,
  status,
}) => {
  let filteredToDo = todos.filter((todo: Todo) =>
    todo.title.toLowerCase().trim().includes(query.toLowerCase().trim()),
  );

  if (status === 'active') {
    filteredToDo = filteredToDo.filter(
      (todo: Todo) => todo.completed === false,
    );
  }

  if (status === 'completed') {
    filteredToDo = filteredToDo.filter((todo: Todo) => todo.completed === true);
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {filteredToDo.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className={isActive === todo.id ? 'has-background-info-light' : ''}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => setIsActive(todo.id)}
              >
                <span className="icon">
                  <i
                    className={`far ${isActive !== todo.id ? 'fa-eye' : 'fa-eye-slash'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
