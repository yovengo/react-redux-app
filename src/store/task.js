const TASK_UPDATED = "task/updated"
const TASK_DELETED = "task/deleted"

export function taskCompleted(id) {
    return {
        type: TASK_UPDATED,
        payload: {id: id, completed: true},
    }
}

export function titleChanged(id) {
    return {
        type: TASK_UPDATED,
        payload: {id: id, title: `New title for ${id}`},
    }
}

export function taskDeleted(id) {
    return {
        type: TASK_DELETED,
        payload: {id}
    }
}

function reducer(state=[], action) {
    switch (action.type) {
        case TASK_UPDATED: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
            newArray[elementIndex]={...newArray[elementIndex], ...action.payload}
            return newArray
        }
        case TASK_DELETED: {
            return state.filter(el => el.id !== action.payload.id)
        }
        default:
            return state;
    }
}
export default reducer