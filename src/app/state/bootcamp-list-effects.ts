import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import { BOOTCAMP_ACTIONS } from './bootcamp-list';

import { db } from '../services/datastore';

const EMBEDTYPES = {
    BOOTCAMP: 'bootcamp',
    YOUTUBE: 'youtube'
};

@Injectable()
export class BootcampListEffects {

  @Effect() addMemberSave$ = this.action$
                             .ofType(BOOTCAMP_ACTIONS.EFFECTS.SAVE_MEMBER)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 db.find(payload, (err, ret) => {
                                     if (ret.length > 0) {
                                        this.zone.run(() => {
                                            obs.next({type: BOOTCAMP_ACTIONS.ACTIONS.ADD_MEMBER, payload: payload});
                                            obs = null;
                                        });
                                     }
                                     else {
                                         db.insert(payload, () => {
                                             this.zone.run(() => {
                                                obs.next({type: BOOTCAMP_ACTIONS.ACTIONS.ADD_MEMBER, payload: payload});
                                                obs = null;
                                             });
                                         });
                                     }
                                 });
                                 return obs;
                             });

    @Effect() deleteMemberRemove$ = this.action$
                             .ofType(BOOTCAMP_ACTIONS.EFFECTS.DELETE_MEMBER)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 console.log("delete");
                                 db.remove(payload, (err, count) => {
                                     console.log(count);
                                    obs.next({type: BOOTCAMP_ACTIONS.ACTIONS.REMOVE_MEMBER, payload: payload});
                                    obs = null;
                                 });
                                 return obs;
                             });

  @Effect() loadMemberList$ = this.action$
                             .ofType(BOOTCAMP_ACTIONS.EFFECTS.LOAD_LIST)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 db.find({type: EMBEDTYPES.BOOTCAMP}, (err, ret) => {
                                     this.zone.run(() => {
                                        obs.next({type: BOOTCAMP_ACTIONS.ACTIONS.LOAD_LIST, payload: {loadedList: ret}});
                                        obs = null;
                                     });
                                 });
                                 return obs;
                             });

  constructor(private action$: Actions, private zone: NgZone) { }
}
