import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InitiativeComponent } from './initiative/initiative.component';

import { StoreModule } from '@ngrx/store';
import { initiativeListReducer } from './state/initiative-list';

@NgModule({
  declarations: [
    AppComponent,
    InitiativeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore({initiativeList: initiativeListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
