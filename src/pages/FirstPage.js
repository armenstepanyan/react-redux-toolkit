import React from 'react'
import { useSelector } from 'react-redux'
import Form from '../components/Form'
import TodoItem from '../components/TodoItem'
import User from '../components/User'
import Posts from '../components/Posts'

function FirstPage() {
    const todos = useSelector(state => state.todo.todos);
  return (
    <>
    <div>
            <div className='container mx-auto px-4'>
                <header className='flex gap-20 '>
                    <div className='w-1/3'>
                        <h1 className='font-bold my-5'>Redux Toolkit State Change</h1>
                        <User />
                    </div>
                    <div className='w-1/3'>
                        <h1 className='font-bold my-5'>Redux Toolkit Todo App</h1>
                        <Form />
                        {
                            (todos || []).map(todo => <TodoItem key={todo.id} {...todo}/>)
                        }
                        
                    </div>
                    <div className='w-1/3'>
                        <h1 className='font-bold my-5'>Redux Toolkit Async Thunk</h1>
                        <Posts />
                    </div>
                </header>
            </div>
        </div>
    </>
  )
}

export default FirstPage