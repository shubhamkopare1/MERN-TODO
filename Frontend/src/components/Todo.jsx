import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URI = 'http://localhost:5000/todos';

    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URI);
            setTodos(response.data);
        } catch (err) {
            setError("Failed to fetch tasks. Please try again later.");
            console.error("Error fetching todos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!newTodo.trim()) {
            alert("Please enter a valid task!");
            return;
        }
        try {
            const response = await axios.post(API_URI, { title: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            const response = await axios.put(`${API_URI}/${id}`, { completed: !completed });
            setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URI}/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            color: '#333',
        },
        inputContainer: {
            display: 'flex',
            marginBottom: '20px',
        },
        input: {
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '10px',
            outline: 'none',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
        },
        list: {
            listStyleType: 'none',
            padding: 0,
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        taskText: (completed) => ({
            textDecoration: completed ? 'line-through' : 'none',
            color: completed ? 'gray' : '#333',
            cursor: 'pointer',
        }),
        deleteButton: {
            marginLeft: '10px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>To-Do List</h1>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    style={styles.input}
                />
                <button onClick={addTodo} style={styles.button}>
                    Add
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {todos.length === 0 && !loading && <p>No tasks available. Add one!</p>}

            <ul style={styles.list}>
                {todos.map((todo) => (
                    <li key={todo._id} style={styles.listItem}>
                        <span
                            onClick={() => toggleTodo(todo._id, todo.completed)}
                            style={styles.taskText(todo.completed)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
