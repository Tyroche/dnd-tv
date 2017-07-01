import { ActionReducer, Action } from '@ngrx/store';

export const BOOTCAMP_ACTIONS = {
    ADD_MEMBER: 'BOOTCAMP_ADD_MEMBER',
    REMOVE_MEMBER: 'BOOTCAMP_REMOVE_MEMBER',
    CLEAR_LIST: 'BOOTCAMP_CLEAR_LIST'
}

export function bootcampListReducer(state = [], action: Action) {

    switch (action.type) {
        case BOOTCAMP_ACTIONS.ADD_MEMBER:
            return [...state, action.payload];

        case BOOTCAMP_ACTIONS.REMOVE_MEMBER:
            return state.filter(s => s.song !== action.payload.song);

        case BOOTCAMP_ACTIONS.CLEAR_LIST:
            return [];

        default:
            return state;
    }
}


