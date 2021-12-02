import { createStore } from 'redux';

const initialState = {
    users: []
};

const reducer = function(state=initialState, action){
    if(action.type === 'ADD_DATA'){
        const copyData = state.users.slice();
        copyData.push(action.value);
        return {
            ...state,
            users: [...copyData]
        };
    }
    return state;
}

const store = createStore(reducer);

export default store;