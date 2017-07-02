import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app-state';
import { BOOTCAMP_ACTIONS } from '../state/bootcamp-list';
import { YOUTUBE_ACTIONS } from '../state/youtube-list';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {

  public EMBEDTYPES = {
    BOOTCAMP: 'bootcamp',
    YOUTUBE: 'youtube'
  }

  public bootcampInput: string;
  public youtubeInput: string;

  public embedFramesBootcamp;
  public embedFramesYoutube;

  constructor(private http: Http,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.embedFramesBootcamp = this.store.select('bootcampList');
    this.embedFramesYoutube = this.store.select('youtubeList');

    this.store.dispatch({type: YOUTUBE_ACTIONS.EFFECTS.LOAD_LIST});
  }

  public addFrame(info: string, embedType: string) {
    const embedData = this.extractEmbedData(info, embedType);

    if (embedData) {
      const actionType = embedData.type === this.EMBEDTYPES.BOOTCAMP
                         ? BOOTCAMP_ACTIONS.ADD_MEMBER
                         : YOUTUBE_ACTIONS.EFFECTS.SAVE_MEMBER;
      this.store.dispatch({type: actionType, payload: embedData});
    }
  }

  private extractEmbedData(data: string, embedType: string) {
    switch (embedType) {
      case this.EMBEDTYPES.BOOTCAMP:
        const album = data.match(/album=(\d+)/);
        const song = data.match(/track=(\d+)/);

        if (!album || !song) return;
        return {
          album: album[1],
          song: song[1],
          type: this.EMBEDTYPES.BOOTCAMP
        }
      case this.EMBEDTYPES.YOUTUBE:
        const match = data.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);

        if(!match || match[2].length != 11) return;
        return {
          id: match[2],
          type: this.EMBEDTYPES.YOUTUBE
        }
    }
  }
}
