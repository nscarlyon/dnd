import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormComponent } from './class-form.component';
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {CharacterService} from "../service/character.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {NO_ERRORS_SCHEMA, Component} from "@angular/core";
import {ClassFeaturesComponent} from "./class-features/class-features.component";
import {Observable} from "rxjs";
import {Wizard} from "../service/backend/wizard";

describe('ClassFormComponent', () => {
  @Component({selector: 'app-class-features', template: ''})
  class ClassFeaturesStub {}
  let component: ClassFormComponent;
  let fixture: ComponentFixture<ClassFormComponent>;
  let characterPubSubStub: any = {
    getValue: (): any => {
      return {characterClass: 'Wizard'};
    },
    update: (): void  => {}
  };
  let characterServiceStub: any = {
    getClass: (): any => {
      return Observable.of(new Wizard())
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFormComponent, ClassFeaturesStub],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: CharacterService, useValue: characterServiceStub},
                  {provide: CharacterPubSubService, useValue: characterPubSubStub}]
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
