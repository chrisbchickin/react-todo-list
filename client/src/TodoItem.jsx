export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  
  return (
    <li key={id}>
      <button
        onClick={() => {
          deleteTodo(id);
        }}
        className="btn btn-danger"
      >
        Delete
      </button>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
    </li>
  );
}
