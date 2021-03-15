import React, { useState ,useEffect } from 'react';
import { Button, FormControl,InputLabel,Input } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';



const useStyles=makeStyles((theme)=>({
  add:{
   
    position:'relative',
    top:'10px',
    left:'10px',
  }
}));

function App() {

  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');
  const classes=useStyles();

  // When the App loads,we need to listen to the database and fetch new todos as they get added/removed

  useEffect(()=>{
    
    // This code here ..... fires when the App loads

    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{  // We are sorting the todos list on the basis of timestamp in descending order i.e the recent todo comes first on the list
      // console.log(snapshot.docs.map(doc=>doc.data())) // This gives us an array of objects
      setTodos(snapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo}))) // .todo gives us the element of that array of objects
    })
  },[]) // This empty array is a dependency,here we want the app to load only one time ,so we have kept an empty array
  
  const addTodo=(event)=>{

    event.preventDefault();
   
    db.collection('todos').add({  // This line of code adds to our cloud firestore database the input we type in
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // This is for sorting the todos i.e the recently added todo on the top and rest below 
    })
    setInput(''); // clear up the input after clicking add Todo Button
  }
  return (
    <div className="App">
     <h1 className="heading">TODO LIST</h1>
     <form className="form">
     <FormControl>
     <InputLabel>Write a Todo</InputLabel>
     <Input value={input} onChange={(event) => setInput(event.target.value)} />
    </FormControl>
     <Button className={classes.add} disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
     Add TODO 
     </Button>
     </form>
     <ul >
     
      {todos.map((todo)=>(
        
        <Todo todo={todo} />
      ))}
     </ul>
    </div>
  );
}

export default App;
