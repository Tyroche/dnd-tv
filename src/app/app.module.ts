import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';
import { SoundComponent } from './sound/sound.component';

import { StoreModule } from '@ngrx/store';
import { initiativeListReducer } from './state/initiative-list';
import { bootcampListReducer } from './state/bootcamp-list';
import { BootcampEmbedComponent } from './sound/bootcamp-embed/bootcamp-embed.component';

@NgModule({
  declarations: [
    AppComponent,
    InitiativeComponent,
    SoundComponent,
    BootcampEmbedComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    StoreModule.provideStore({
      initiativeList: initiativeListReducer,
      bootcampList: bootcampListReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
