import { ActionReducer, Action } from '@ngrx/store';

export const YOUTUBE_ACTIONS = {
    ACTIONS: {
        ADD_MEMBER: 'YOUTUBE_ADD_MEMBER',
        REMOVE_MEMBER: 'YOUTUBE_REMOVE_MEMBER',
        CLEAR_LIST: 'YOUTUBE_CLEAR_LIST',
        LOAD_LIST: 'YOUTUBE_LOAD_LIST',
    },
    EFFECTS: {
        LOAD_LIST: 'YOUTUBE_LOAD_LIST_EFFECT',
        SAVE_MEMBER: 'YOUTUBE_SAVE_MEMBER_EFFECT'
    }
}

export function youtubeListReducer(state = [], action: Action) {

    switch (action.type) {
        case YOUTUBE_ACTIONS.ACTIONS.ADD_MEMBER:
            return [...state, action.payload];

        case YOUTUBE_ACTIONS.ACTIONS.REMOVE_MEMBER:
            return state.filter(s => s.id !== action.payload.id);

        case YOUTUBE_ACTIONS.ACTIONS.CLEAR_LIST:
            return [];

        case YOUTUBE_ACTIONS.ACTIONS.LOAD_LIST:
            return [].concat(action.payload.loadedList);

        default:
            return state;
    }
}


