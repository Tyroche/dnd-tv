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
                             .ofType(YOUTUBE_ACTIONS.ADD_MEMBER)
                             .map(toPayload)
                             .switchMap(payload => {
                                 const obs = new Subject();
                                 db.find({id: payload.id, type: EMBEDTYPES.YOUTUBE}, (err, ret) => {
                                     console.log("finding:", payload.id);
                                     //ID prese
                                     if (ret.length > 0) {
                                        console.log("found:", ret[0]);
                                        obs.next(payload);
                                     }
                                     else {
                                         console.log("inserting: ", payload.id)
                                         db.insert({id: payload.id, type: EMBEDTYPES.YOUTUBE}, () => {
                                             console.log("inserted: ", payload.id)
                                             obs.next(payload);
                                         })
                                     }
                                 });
                                 return obs;
                             });

  @Effect() loadMemberList$ = this.action$
                             .ofType(YOUTUBE_ACTIONS.LOAD_LIST_EFFECT)
                             .map(toPayload)
                             .switchMap(payload => {
                                 let obs = new Subject();
                                 db.find({type: EMBEDTYPES.YOUTUBE}, (err, ret) => {
                                     this.zone.run(() => {
                                        obs.next({type: YOUTUBE_ACTIONS.LOAD_LIST, payload: {loadedList: ret}});
                                        obs = null;
                                     });
                                 });
                                 return obs;
                             });

  constructor(private action$: Actions, private zone: NgZone) { }


}
