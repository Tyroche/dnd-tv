import { ActionReducer, Action } from '@ngrx/store';

export const ADD_MEMBER = 'ADD_MEMBER';
export const REMOVE_MEMBER = 'DEAD_MEMBER';
export const KILL_MEMBER = 'KILL_MEMBER';
export const CLEAR_LIST = 'CLEAR_LIST';
export const REVIVE_MEMBER = 'REVIVE_MEMBER';

function sortRolls(a, b) {
    if (a.roll > b.roll) {
        return -1;
    }
    if (a.roll < b.roll) {
        return 1;
    }
    return 0;
}

export function initiativeListReducer(state = [], action: Action) {
    let member;

    switch (action.type) {
        case ADD_MEMBER:
            const newState = [...state, {
                name: action.payload.name,
                roll: action.payload.roll,
                alive: true
            }];

            newState.sort(sortRolls);
            return newState;

        case REMOVE_MEMBER:
            return state.filter(s => s.name !== action.payload.name);

        case KILL_MEMBER:
            member = state.find(s => s.name === action.payload.name);
            if (member) {
                member.alive = false;
            }
            return [].concat(state);

        case REVIVE_MEMBER:
            member = state.find(s => s.name === action.payload.name);
            if (member) {
                member.alive = true;
            }
            return [].concat(state);

        case CLEAR_LIST:
            return [];

        default:
            return state;
    }
}


