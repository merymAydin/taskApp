import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList';

//http metodları
/*
get = veriyi getirmek için kullanılır.
post = yeni veri oluşturmak için kullanılır.
put = var olan veriyi güncellemek için kullanılır.
delete = veri silmek için kullanılır.
*/ 

function App() {
  const [tasks,setTasks] = useState([]);

  
  const createTask = async(title,description,important) => {
    const response = await axios.post("http://localhost:3000/tasks",{
      title,
      description,
      important
    });
    //console.log(response);
    
    // setTasks([...tasks,{
    //   id : Math.ceil(Math.random() * 9999999),
    //   title,
    //   description,
    //   important
    // }]);
    setTasks([...tasks,response.data]);
  }

  const  getTask = async() => {
    const response =  await axios.get("http://localhost:3000/tasks")
    setTasks(response.data)
  }

  useEffect(() => {
    getTask();
  },[]); //komponent ilk kez yüklendiğinde çalışır yani her zaman

  //numbers = {1,2,3,4,5};

  //newNumbers=Numbers.filter((number) => number !== 3)
  //[1,2,4,5]

  //tasks = [{id:1},title:Html,description:"asdadfas",important]
  async function deleteTask(id){
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    getTask();
    // const deletedAfterTasks = tasks.filter((task) => task.id !== id )
    // setTasks(deletedAfterTasks);
  } 

  const updateTask = async(id,title,description,important) => {
    await axios.put(`http://localhost:3000/tasks/${id}`,{
      title,
      description,
      important
    });
    //üsttekini yapınca alttakine gerek kalmıyo
    // const updatedTask = tasks.map((task) => {
    //   if(task.id === id){
    //     return{id,title,description,important}
    //   }
    //   return task;
    // })
    //setTasks(updatedTask);
   // getTask();



   //yeni
  }


  return (
    <>
    <div id="app">
      <div id="task-form-container">
        <TaskForm create={createTask}/>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask}/>
    </div>
    </>
  )
}

export default App

