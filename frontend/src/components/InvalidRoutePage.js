import React from 'react'
import {Link } from 'react-router-dom'

const style = {
    background: 'f9f8ff',
    fontSize: '5em'
}

export default ({authed})=> (
    <div style={style} className='ui inverted error message'>
        <div className='ui container'>
            <h1 className='ui segment ui message'> 404 Error 🚑 </h1>
            <p> This page does not exist or you are not authorized to view it</p> 
        </div>
    </div>
)