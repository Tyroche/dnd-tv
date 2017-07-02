import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { YOUTUBE_ACTIONS } from './youtube-list';

import * as Datastore from 'nedb';

const db = new Datastore({filename: './dnd-tv-db', autoload: true})

@Injectable()
export class YoutubeListEffects {

  @Effect() addMemberSave$ = this.action$
                             .ofType(YOUTUBE_ACTIONS.ADD_MEMBER)
                             .map(toPayload)
                             .switchMap(payload => {
                                 const obs = new Subject();
                                 db.find({id: payload.id}, (err, ret) => {
                                     console.log("finding:", payload.id);
                                     //ID present
                                     if (ret.length > 0) {
                                        console.log("found:", ret[0]);
                                        obs.next(payload);
                                     }
                                     else {
                                         console.log("inserting: ", payload.id)
                                         db.insert({id: payload.id}, () => {
                                             console.log("inserted: ", payload.id)
                                             obs.next(payload);
                                         })
                                     }
                                 });
                                 return obs;
                             })

  constructor(private action$: Actions) { }


}
