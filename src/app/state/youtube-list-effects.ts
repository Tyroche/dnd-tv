import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Injectable, NgZone} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import { YOUTUBE_ACTIONS } from './youtube-list';

import * as Datastore from 'nedb';

const db = new Datastore({filename: './dnd-tv-db', autoload: true})

const EMBEDTYPES = {
    BOOTCAMP: 'bootcamp',
    YOUTUBE: 'youtube'
};

@Injectable()
export class YoutubeListEffects {

  @Effect() addMemberSave$ = this.action$
                             .ofType(YOUTUBE_ACTIONS.EFFECTS.SAVE_MEMBER)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 db.find(payload, (err, ret) => {
                                     if (ret.length > 0) {
                                        this.zone.run(() => {
                                            obs.next({type: YOUTUBE_ACTIONS.ACTIONS.ADD_MEMBER, payload: payload});
                                            obs = null;
                                        });
                                     }
                                     else {
                                         db.insert(payload, () => {
                                             this.zone.run(() => {
                                                obs.next({type: YOUTUBE_ACTIONS.ACTIONS.ADD_MEMBER, payload: payload});
                                                obs = null;
                                             });
                                         });
                                     }
                                 });
                                 return obs;
                             });

  @Effect() loadMemberList$ = this.action$
                             .ofType(YOUTUBE_ACTIONS.EFFECTS.LOAD_LIST)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 db.find({type: EMBEDTYPES.YOUTUBE}, (err, ret) => {
                                     this.zone.run(() => {
                                        obs.next({type: YOUTUBE_ACTIONS.ACTIONS.LOAD_LIST, payload: {loadedList: ret}});
                                        obs = null;
                                     });
                                 });
                                 return obs;
                             });

  constructor(private action$: Actions, private zone: NgZone) { }
}
