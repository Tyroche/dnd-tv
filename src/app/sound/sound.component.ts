import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { BOOTCAMP_ACTIONS } from '../state/bootcamp-list';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {

  private albumNumberRegex = /album=(\d+)/;
  private songNumberRegex = /track=(\d+)/;

  public frameInfo: string;

  public embedFrames;

  constructor(private http: Http, private store: Store<AppState>) { }

  ngOnInit() {
    this.embedFrames = this.store.select('bootcampList');
  }

  public addFrame(info: string) {
    const embedData = this.extractEmbedData(info);

    if (embedData) {
      this.store.dispatch({type: BOOTCAMP_ACTIONS.ADD_MEMBER, payload: embedData});
    }
  }

  private extractEmbedData(data: string) {
    let album = data.match(this.albumNumberRegex);
    let song = data.match(this.songNumberRegex);

    if (!album || !song) return;

    return {
      album: album[1],
      song: song[1]
    }
  }
}
