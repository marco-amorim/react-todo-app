import React, { useState, useCallback, useEffect } from 'react'; // hooks!

// function App() {
// 	return (
// 		<div>
// 			<h1>Hello world!</h1>
// 		</div>
// 	);
// }

// const App = () => {
// 	// destructuring because useState returns an array
// 	const [name, setName] = useState('Marco');
// 	const onNameChange = useCallback((event) => {
// 		console.log(event.target.value);
// 		setName(event.target.value);
// 	}, []); // passing [] because it has no dependencies!
// 	return (
// 		<div>
// 			<form>
// 				<label>Enter your name:</label>
// 				<input value={name} onChange={onNameChange} />
// 			</form>
// 			<h1>Hello {name}!</h1>
// 		</div>
// 	);
// };

const App = () => {
	const [newTodo, setNewTodo] = useState('');
	const [todos, setTodos] = useState([]);
	const onNewTodoChange = useCallback((event) => {
		// useCallback creates a cached version of a function!
		setNewTodo(event.target.value);
	}, []);

	const formSubmitted = useCallback(
		(event) => {
			event.preventDefault();
			if (!newTodo.trim()) return;
			setTodos([
				...todos,
				{
					id: todos.length + 1,
					content: newTodo,
					done: false,
				},
			]);
			setNewTodo('');
		},
		[newTodo, todos]
	); // if newTodo or todos ever change the callback is called!

	useEffect(() => {
		console.log('todos', todos);
	}, [todos]);

	const addTodo = useCallback(
		(todo, index) => (event) => {
			// this is a clojure!
			const newTodos = [...todos];
			newTodos.splice(index, 1, {
				...todo,
				done: !todo.done,
			});
			setTodos(newTodos);
		},
		[todos]
	);

	const removeTodo = useCallback(
		(todo) => (event) => {
			setTodos(todos.filter((otherTodo) => otherTodo !== todo));
		},
		[todos]
	);

	const markAllDone = useCallback(() => {
		// create a copy of the array
		// create a copy of each of the items
		// update the done property to be true on each of the new items
		const updatedTodos = todos.map((todo) => {
			return {
				...todo,
				done: true,
			};
		});
		setTodos(updatedTodos);
	}, [todos]);

	const unmarkAll = useCallback(() => {
		const updatedTodos = todos.map((todo) => {
			return {
				...todo,
				done: false,
			};
		});
		setTodos(updatedTodos);
	}, [todos]);

	return (
		<div>
			<form onSubmit={formSubmitted}>
				<label htmlFor="newTodo">Enter a Todo:</label>
				<input
					id="newTodo"
					name="newTodo"
					value={newTodo}
					onChange={onNewTodoChange}
				/>
				<button>Add Todo</button>
				<button onClick={markAllDone}>Mark All Done</button>
				<button onClick={unmarkAll}>Unmark All</button>
			</form>
			<ul>
				{todos.map((todo, index) => (
					<li key={todo.id}>
						<div className="todoItem">
							<span className={todo.done ? 'done' : ''}>{todo.content}</span>
							<input
								checked={todo.done}
								type="checkbox"
								onChange={addTodo(todo, index)}
							/>
						</div>
						<button onClick={removeTodo(todo)}>Remove Todo</button>
					</li> // uses key (has to be unique) attribute for Virtual DOM to know what should be updated! (doesn't show in browser html)
				))}
			</ul>
		</div>
	);
};

export default App;
