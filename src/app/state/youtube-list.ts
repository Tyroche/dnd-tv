import { ActionReducer, Action } from '@ngrx/store';

export const YOUTUBE_ACTIONS = {
    ADD_MEMBER: 'YOUTUBE_ADD_MEMBER',
    REMOVE_MEMBER: 'YOUTUBE_REMOVE_MEMBER',
    CLEAR_LIST: 'YOUTUBE_CLEAR_LIST'
}

export function youtubeListReducer(state = [], action: Action) {

    switch (action.type) {
        case YOUTUBE_ACTIONS.ADD_MEMBER:
            return [...state, action.payload];

        case YOUTUBE_ACTIONS.REMOVE_MEMBER:
            return state.filter(s => s.id !== action.payload.id);

        case YOUTUBE_ACTIONS.CLEAR_LIST:
            return [];

        default:
            return state;
    }
}


