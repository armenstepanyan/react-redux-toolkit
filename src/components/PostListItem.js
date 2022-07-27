import React from 'react'

const style = {
    border: '1px solid #eee',
    padding: '2px 5px',
    margin: '5px',
    width: '560px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
}

function PostListItem({ id, title, remove, update }) {
    const handleUpdate = () => {
        const newTitle = prompt('Enter new title');
        update({ id, title: newTitle });
    }
  return (
    <div style={style}>
        <div>
        {id}. {title}
        </div>
        <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded" onClick={handleUpdate}>
            Update
        </button>

        <button className='btn bg-red-500 py-2 px-2 rounded' onClick={() => remove(id)}>Delete</button>
        </div>
    </div>
  )
}

export default PostListItem