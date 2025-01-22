import { AiOutlineDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import { AiTwotoneCreditCard } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react'
import axios from 'axios' ;
import { toast } from 'react-toastify';
import "../css/TodoList.css";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' })

    const getAllTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/todolist/getAll');
            setTodos(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTodos();
        console.log('This Runs once when the Component mounts');
    }, []);

    //The useEffect hook is an esential part of React Component. It is used to perform side effects in functional components .

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:3000/todolist/deleteToDo/${id}`);

            if (result.data.success === 'deleted') {
                toast.success('Todo deleted Successfully');
                getAllTodos();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed To Delete Todo')
        }
    };

    const handleEditInputChange = (e) => {
        setCurrentTodo({ ...currentTodo, message: e.target.value })
    };

    // ...currentTodo means "create a new object and copy all properties of currentTodo into it."

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ _id: todo._id, message: todo.message });
    };

    const handleUpdate = async () => {
        if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
            toast.error('Message must be between 4 and 20 charecters');
            return;
        }

        try {
            const result = await axios.put(`http://localhost:3000/todolist/updateToDo/${currentTodo._id}`,
                {
                    message: currentTodo.message
                });
            if (result.data.success === 'updated') {
                toast.success('Todo Updated Successfully');
                getAllTodos();
                setIsEditing(false);
                setCurrentTodo({ _id: null, message: '' })
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to Update Todos');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: '' })
    }

    return (
        <div className="todo-list">
            {isEditing ? (
                <div className="edit-section">
                    <input
                        type='text'
                        value={currentTodo.message}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            {todo.message}
                            <AiFillEdit className="icon1" onClick={() => handleEdit(todo)} />
                            <AiOutlineDelete className="icon2" onClick={() => handleDelete(todo._id)} />
                        </li>
                    ))}

                </ul>
            )}
        </div>
    )
}

export default TodoList
