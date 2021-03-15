import React ,{useState} from 'react';
import {List,ListItem,ListItemText,Button, Container} from '@material-ui/core';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    paper: {
     position:'absolute',
     top:'100px',
      textAlign:'center',
      width: '300px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display:'flex',
      flexWrap:'wrap',
      margin:'10px',
    },

    
    content:{
       
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
 
    },
    delete:{
        cursor: 'pointer',
        marginLeft: '15px',
        position: 'relative',
        top:'0px',
        fontSize:'2em',
      },
      listitemtext:{
          fontSize:'20px',
          overflow:'hidden',
          textOverflow:'ellipsis',
      },
  }));

function Todo(props) {
    
    const classes=useStyles();
    const [open,setOpen]=useState(false);
    const [input,setInput]=useState('');

    const handleOpen=()=>{
        setOpen('true');
    }

    
    const updateTodo=()=>{
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
         
            todo:input

        },{merge:true}); // what this merge does is it keeps the current todo item and appends onto it the input we try to edit afterwards

        setOpen(false);
    }

    return (

   <div>

    <Modal
    open={open}
    onClose={e=>setOpen(false)}
    >
        <form>
        <div className={classes.content}>
        <div className={classes.paper}>
            <input className="original" placeholder={props.todo.todo} value={input} onChange={event=>setInput(event.target.value)}/>
            <Button className="update" type="submit" onClick={updateTodo} variant="contained" color="primary">Update Todo</Button>
            
        </div>
        </div>
        </form>
    </Modal>


       <Container maxWidth="false">
       
       <List className="todo-content">
       <ListItem>
       <ListItemText classes={{primary:classes.listitemtext}} primary={props.todo.todo} /> 
       <button className="editbutton" onClick={handleOpen}>Edit</button>
       <DeleteForeverIcon className={classes.delete} onClick={event=>{
           db.collection('todos').doc(props.todo.id).delete();
       }}></DeleteForeverIcon>
       </ListItem>
       </List>
       </Container>

       </div>
    )
}

export default Todo
