import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateCharacterComponent } from './create-character/create-character.component';
import {CharacterService} from "./service/character.service";
import { AbilitiesFormComponent } from './abilities-form/abilities-form.component';
import { ClassFormComponent } from './class-form/class-form.component';
import {CharacterPubSubService} from "./service/character-pubsub.service";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    CreateCharacterComponent,
    AbilitiesFormComponent,
    ClassFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CharacterService, CharacterPubSubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
