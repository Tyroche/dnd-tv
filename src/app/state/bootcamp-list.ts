import { ActionReducer, Action } from '@ngrx/store';

export const BOOTCAMP_ACTIONS = {
    ACTIONS: {
        ADD_MEMBER: 'BOOTCAMP_ADD_MEMBER',
        REMOVE_MEMBER: 'BOOTCAMP_REMOVE_MEMBER',
        CLEAR_LIST: 'BOOTCAMP_CLEAR_LIST',
        LOAD_LIST: 'BOOTCAMP_LOAD_LIST',
    },
    EFFECTS: {
        LOAD_LIST: 'BOOTCAMP_LOAD_LIST_EFFECT',
        SAVE_MEMBER: 'BOOTCAMP_SAVE_MEMBER_EFFECT',
        DELETE_MEMBER: 'BOOTCAMP_DELETE_MEMBER_EFFECT'
    }
}

export function bootcampListReducer(state = [], action: Action) {

    switch (action.type) {
        case BOOTCAMP_ACTIONS.ACTIONS.ADD_MEMBER:
            return [...state, action.payload];

        case BOOTCAMP_ACTIONS.ACTIONS.REMOVE_MEMBER:
            if (action.payload.song) {
                return state.filter(s => s.song !== action.payload.song);
            } else {
                return state.filter(s => s.album !== action.payload.album);
            }

        case BOOTCAMP_ACTIONS.ACTIONS.CLEAR_LIST:
            return [];

        case BOOTCAMP_ACTIONS.ACTIONS.LOAD_LIST:
            return [].concat(action.payload.loadedList);

        default:
            return state;
    }
}


