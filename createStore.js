import { createStore,bindActionCreators,combineReducers } from "redux";

const Add_Todo = 'add_todo';
const Del_Todo = 'delete_todo';
const Update_Todo = 'update_todo';
const Add_User = 'add_user';

function todoReducer(state = [], action) {
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
};

function userReducer(state = [], action) {
  if (action.type === Add_User) {
    const userName = action.payload.userName;
    return [
      ...state,
      {
        name: userName, // Use the provided userName
        id: state.length === 0 ? 1 : state[state.length - 1].id + 1,
      },
    ];
  }
  // Make sure to return the state in the else block
  return state;
}

  
// action creator
const addTodo = (todoText) =>  ({type: Add_Todo, payload: {todoText} });
const deleteTodo = (id) => ({type: Del_Todo, payload: {id: id}});
const addUser = (userName ) => ({type: Add_User, payload: {userName}});

const reducer = combineReducers({todo: todoReducer, user: userReducer});

const {dispatch,getState,subscribe,replaceReducer} = createStore(reducer);

const actions = bindActionCreators({addTodo,deleteTodo, addUser}, dispatch)
subscribe(() => console.log(getState()))
actions.addTodo('todo-1');
actions.addTodo('todo-2');
actions.deleteTodo(1);
actions.addUser('shoaib')
