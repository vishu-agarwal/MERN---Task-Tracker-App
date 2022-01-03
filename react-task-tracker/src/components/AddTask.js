import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const AddTask = () => {

    const navigate = useNavigate();
    const addtask = () => {
        axios.post("/api/addTasks", task).then(res => alert(res.data.data));
        navigate('/notify')
      };
    
      const task = {
        id: 0,
        text: "",
        day: "",
        reminder: false,
      };
    return (
        <form className='add-form' >
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task'  onChange={(e) => (task.text = e.target.value) }></input>
        </div>
        <div className='form-control'>
            <label>Day & Time</label>
            <input type='text' onChange={(e) => (task.day = e.target.value) } placeholder='Day & Time'></input>
        </div><div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type='checkbox'  onChange={(e) => (task.reminder =  e.currentTarget.checked) } placeholder='Add Task'></input>
        </div>
        <input type='submit' value='Save Task' onClick={addtask} className='btn btn-block'></input>
    </form>
    )
}

export default AddTask
