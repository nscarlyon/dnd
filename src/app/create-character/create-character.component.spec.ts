import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCharacterComponent } from './create-character.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CharacterService} from "../service/character.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs";
import {RaceSelection} from "../shared/race-selection";
import {ForestGnome} from "../service/backend/forest-gnome";
import {RockGnome} from "../service/backend/rock-gnome";

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCharacterComponent ],
      imports: [ReactiveFormsModule],
      providers: [CharacterService],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should set races and default selected characterRace', () => {
    spyOn(CharacterService.prototype, 'getRaces').and.returnValue(Observable.of([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]));
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.setRaces();
    expect(component.races).toEqual([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]);
    expect(component.characterRace.value).toEqual("Forest Gnome");
  });

  it('should change selected characterRace', () => {
    spyOn(CharacterService.prototype, 'getRaces').and.returnValue(Observable.of([new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"])]));
    spyOn(CharacterService.prototype, 'getRace').and.callFake((race: string) =>{
      return race === "Forest Gnome"
      ? Observable.of(new ForestGnome())
      : Observable.of(new RockGnome())
    });
    component.classes = ["Wizard", "Barbarian"];
    component.levels = [1, 2];
    component.setRaces();
    component.characterForm.patchValue({characterRace: "Rock Gnome"});
    expect(component.selectedRace).toEqual(new RockGnome());
    component.characterForm.patchValue({characterRace: "Forest Gnome"});
    expect(component.selectedRace).toEqual(new ForestGnome());
  });
});
