import React from 'react'
import {Link } from 'react-router-dom'

const style = {
    background: 'f9f8ff',
    fontSize: '5em'
}
export default ()=> (
    <div style={style} className='ui inverted error message'>
        <div className='ui container'>
            <h1 className='ui segment ui message'> 4️⃣0️4️⃣ </h1>
            <p> This page may not exist, if it should <span><Link to='/signin'>Sign In!</Link></span></p>
        </div>
    </div>
)