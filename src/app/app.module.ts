import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';

import { SoundComponent } from './sound/sound.component';
import { BootcampEmbedComponent } from './sound/bootcamp-embed/bootcamp-embed.component';
import { YoutubeEmbedComponent } from './sound/youtube-embed/youtube-embed.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initiativeListReducer } from './state/initiative-list';
import { bootcampListReducer } from './state/bootcamp-list';
import { youtubeListReducer } from './state/youtube-list';
import { YoutubeListEffects } from './state/youtube-list-effects';
import { BootcampListEffects } from './state/bootcamp-list-effects';


@NgModule({
  declarations: [
    AppComponent,
    InitiativeComponent,
    SoundComponent,
    BootcampEmbedComponent,
    YoutubeEmbedComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    StoreModule.provideStore({
      initiativeList: initiativeListReducer,
      bootcampList: bootcampListReducer,
      youtubeList: youtubeListReducer
    }),
    EffectsModule.run(YoutubeListEffects),
    EffectsModule.run(BootcampListEffects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
