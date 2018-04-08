import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AbilitiesFormComponent} from "./abilities-form/abilities-form.component";
import {CreateCharacterComponent} from "./create-character/create-character.component";

const appRoutes: Routes = [
  {
    path: '',
    component: CreateCharacterComponent
  },
  {
    path: '2',
    component: AbilitiesFormComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
