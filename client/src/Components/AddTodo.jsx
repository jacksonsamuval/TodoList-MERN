import React, { useState } from 'react'
import axios from 'axios';
import "../css/AddTodo.css";
import { toast } from 'react-toastify';

const AddTodo = () => {

    const [message, setMessage] = useState('');

    const createTodo = async (e) => {
        if (message === '') {
            toast.error("Cannot add an Empty Message");
            return;
        }

        if (message.length < 4 || message.length > 20) {
            toast.error("Message must be between 4 and 20 characters");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/todolist/', {
                message: message,
            });
            if (response.data.success === 'created') {
                toast.success('Added Successfully!')
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container'>
           <input className='input-box'
                type='text'
                placeholder='Add Task Here'
                onChange={(e) => setMessage(e.target.value)}
            />

            <button onClick={createTodo} className='btn'>
                ADD
            </button>
        </div>
    );
}

export default AddTodo
