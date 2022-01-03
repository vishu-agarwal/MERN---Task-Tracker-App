import { useState, useEffect  } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { Route } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Notify from "./components/Notify";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () =>  {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([])
 // const [user,setLoginUser] = useState({})

useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
 // fetch tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');
  const data = await res.json();
  //console.log(data);
  return data;
};
 // fetch task
 const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();
  //console.log(data);
  return data;
};
// //Add task
// const addTask =  async (task) => {

//   const res = await fetch('http://localhost:5000/tasks',{
//     method: 'POST',
//     headers: {
//       'Content-type':'application/json'
//     },
//     body: JSON.stringify(task),
//   })

//   const data = await res.json()
//   setTasks([...tasks, data])
//   // const id = Math.floor(Math.random() * 10000) + 1;
//   // const newTask = { id, ...task };
//   // setTasks([...tasks, newTask]);
// }

//Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id ))
}

//Toggle Remindrer
const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,
  reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },

    body:JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => 
  task.id === id ? {...task,reminder: 
  data.reminder} : task))
}

const [user,setLoginUser] = useState({})
  return (
    <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>

      <Route  path="/" element={user && user.email ? <About/> : <Login setLoginUser={setLoginUser}/>}/>
        {/* <Route
          path='/'
          element={
            <>
              {showAddTask && <AddTask />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        /> */}
        <Route path='/about' element={<About />} />
        <Route path='/notify' element={<Notify />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setLoginUser={setLoginUser}/>} />
      </Routes>
      <Footer />
    </div>
  </Router>
   
  );
}

export default App;
