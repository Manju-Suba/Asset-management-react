import {GET_ALL_CHECK_LIST } from '../../actionType';

const INIT_STATE = {

    CheckList:[]
}

export default (state=INIT_STATE,action) => {
    switch(action.type) {
        case GET_ALL_CHECK_LIST:
            return {...state,CheckList:action.payload};
        default:
            return state;    
    }
}