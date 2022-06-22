import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store";
import {completeTask, getTasks, taskDeleted, titleChanged, loadTasks, getTasksLoadingStatus} from './store/task'
import {Provider, useDispatch, useSelector} from "react-redux";
import {getError} from "./store/errors";


const store = configureStore()


const App = () => {
    const state = useSelector((getTasks()))
    const isLoading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    }, [])


    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map(el => <li key={el.id}>
                    <p>{el.title}</p>
                    <p>{`Completed: ${el.completed}`}</p>
                    <button onClick={() => dispatch(completeTask(el.id))}>Completed</button>
                    <button onClick={() => changeTitle(el.id)}>Change title</button>
                    <button onClick={() => deleteTask(el.id)}>Delete task</button>
                    <hr/>
                </li>)}
            </ul>
        </>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
