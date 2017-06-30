import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { ADD_MEMBER, CLEAR_LIST, KILL_MEMBER, REMOVE_MEMBER, REVIVE_MEMBER } from '../state/initiative-list';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  public initiativeList: Observable<any[]>;
  public name: string;
  public roll: string;

  constructor(private store: Store<AppState>) {
    this.initiativeList = store.select('initiativeList');
  }

  ngOnInit() {
    this.addMember('Tyroche', 15);
  }

  public addMember(name, roll) {
    if (!name || isNaN(+roll) || +roll <= 0) {
      return;
    }

    this.store.dispatch({type: ADD_MEMBER, payload: {name: name, roll: +roll}});

    this.name = '';
    this.roll = '';
  }

  public removeMember(name) {
    this.store.dispatch({type: REMOVE_MEMBER, payload: {name: name}});
  }

  public killMember(name) {
    this.store.dispatch({type: KILL_MEMBER, payload: {name: name}});
  }

  public reviveMember(name) {
    this.store.dispatch({type: REVIVE_MEMBER, payload: {name: name}});
  }

  public clearList() {
    this.store.dispatch({type: CLEAR_LIST});
  }
}
