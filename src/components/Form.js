import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice';

const Form = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState('');

    const addTodoHandler = () => {
        const todo = {
            id: Date.now(),
            text: value,
            completed: false,
        }
        dispatch(addTodo(todo));
        setValue('');
    }
    return (
        <form className='w-full flex' onSubmit={(e) => {e.preventDefault(); addTodoHandler()}}>
            <input
                type='text'
                placeholder='Type something...'
                value={value}
                onChange={e => setValue(e.target.value)}
                className='w-full p-1 focus:outline-none focus:border-lime-500 focus: border-2 placeholder:text-sm'
            />
            <button
                type='submit'
                className='shrink-0 bg-lime-300  hover:bg-lime-400 transition-all px-3 text-sm'
            >
                Submit
            </button>
        </form>
    )
}

export default Form
