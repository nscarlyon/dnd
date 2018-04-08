import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterComponent } from './create-character.component';
import {ReactiveFormsModule, FormGroup, FormArray} from "@angular/forms";
import {CharacterService} from "../service/character.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs";
import {RaceSelection} from "../shared/race-selection";
import {ForestGnome} from "../service/backend/forest-gnome";
import {RockGnome} from "../service/backend/rock-gnome";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCharacterComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [CharacterService, CharacterPubSubService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set levels', () => {
    spyOn(CharacterService.prototype, 'getLevels').and.returnValue(Observable.of([1, 2]));
    component.setLevels();
    expect(component.levels).toEqual([1, 2]);
  });

  it('should set classes', () => {
    spyOn(CharacterService.prototype, 'getClasses').and.returnValue(Observable.of(["Wizard", "Barbarian"]));
    component.setClasses();
    expect(component.classes).toEqual(["Wizard", "Barbarian"]);
  });

  it('should set races', () => {
    spyOn(CharacterService.prototype, 'getRaces').and.returnValue(Observable.of([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]));
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.setRaces();
    expect(component.races).toEqual([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]);
  });

  it('should set races', () => {
    spyOn(CharacterService.prototype, 'getRaces').and.returnValue(Observable.of([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]));
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.setRaces();
    expect(component.races).toEqual([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]);
  });

  it('should save default character form', () => {
    component.races = [new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])];
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.createCharacterForm();
    let expected: any = {
      characterName: "Sporkle",
      characterClass: "Wizard",
      characterRace: "Forest Gnome",
      characterLevel: 1,
      abilities: []
    };
    expect(component.savedCharacterForm).toEqual(expected);
  });

  it('should use savedCharacterForm results instead of default values', () => {
    component.races = [new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])];
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.savedCharacterForm = {
      characterName: "Changed Name",
      characterClass: "Barbarian",
      characterRace: "Rock Gnome",
      characterLevel: 2,
      abilities: []
    };
    component.createCharacterForm();
    expect(component.characterForm.get('characterName').value).toEqual("Changed Name");
    expect(component.characterForm.get('characterClass').value).toEqual("Barbarian");
    expect(component.characterForm.get('characterRace').value).toEqual("Rock Gnome");
    expect(component.characterForm.get('characterLevel').value).toEqual(2);
  });

  it('should reset saved abilities when the characterRace changes', () => {
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.races = [new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])];
    component.savedCharacterForm = {
      characterName: "Changed Name",
      characterClass: "Barbarian",
      characterRace: "Rock Gnome",
      characterLevel: 2,
      abilities: ["ability 1"]
    };
    component.createCharacterForm();
    expect(component.characterForm.get('characterRace').value).toEqual("Rock Gnome");
    component.characterForm.patchValue({characterRace: "Forest Gnome"});
    expect(component.characterForm.get('characterRace').value).toEqual("Forest Gnome");
    expect(component.savedCharacterForm.abilities).toEqual([]);
  });
});
