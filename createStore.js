import { createStore,bindActionCreators } from "redux";

const Add_Todo = 'add_todo';
const Del_Todo = 'delete_todo';
const Update_Todo = 'update_todo';

function todoReducer(state, action) {
    if (action.type == Add_Todo) {
      const todoText = action.payload.todoText;
      return [
        ...state,
        {
          text: todoText,
          isFinished: false,
          id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
        },
      ];
    } else if (action.type === Del_Todo) {
      const todoId = action.payload.id;
      return state.filter((t) => t.id !== todoId);
    } else if (action.type === Update_Todo) {
      const todo = action.payload.todo;
      const todoText = action.payload.todoText;
      return state.map((t) => {
        if (t.id === todo.id) {
          t.text = todoText;
        }
        return t; // Don't forget to return the updated or unchanged object
      });
    }
    return state;
  }
  
// action creator
const addTodo = (todoText) =>  ({type:Add_Todo, payload: {todoText} });
const deleteTodo = (id) => ({type:Del_Todo, payload: {id: id}})

const {dispatch,getState,subscribe,replaceReducer} = createStore(todoReducer,[]);
subscribe(() => console.log(getState()))

const actions = bindActionCreators({addTodo,deleteTodo}, dispatch)
actions.addTodo('todo-1');
actions.addTodo('todo-2');
actions.deleteTodo(1)
