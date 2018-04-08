import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbilitiesFormComponent } from './abilities-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ForestGnome} from "../service/backend/forest-gnome";
import {CharacterService} from "../service/character.service";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {DarkElf} from "../service/backend/dark-elf";

describe('AbilitiesFormComponent', () => {
  let component: AbilitiesFormComponent;
  let fixture: ComponentFixture<AbilitiesFormComponent>;
  let characterPubSubStub: any = {
    getValue: (): any => {
      return {abilities: []};
    }
  };
  let characterServiceStub: any = {
    getRace: (): any => {
      return Observable.of(new ForestGnome())
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilitiesFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: CharacterService, useValue: characterServiceStub},
                  {provide: CharacterPubSubService, useValue: characterPubSubStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the characterRace modifier for a forest gnome', () => {
    component.createAbilitiesForm();
    expect(component.abilities.controls[0].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[1].get('raceModifier').value).toEqual(1);
    expect(component.abilities.controls[2].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[3].get('raceModifier').value).toEqual(2);
    expect(component.abilities.controls[4].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[5].get('raceModifier').value).toEqual(0);
  });

  it('should get different characterRace modifier when the characterRace changes', () => {
    component.characterRace = new DarkElf();
    component.createAbilitiesForm();
    expect(component.abilities.controls[0].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[1].get('raceModifier').value).toEqual(2);
    expect(component.abilities.controls[2].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[3].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[4].get('raceModifier').value).toEqual(0);
    expect(component.abilities.controls[5].get('raceModifier').value).toEqual(1);
  });

  it('should get total intelligence ability score and ability modifier for forest gnome', () => {
    component.createAbilitiesForm();
    component.abilities.controls[3].get('abilityStat').patchValue(15);
    component.updateAbilityScores(component.abilities.controls[3]);
    expect(component.abilities.controls[3].get('abilityModifier').value).toEqual(3);
    expect(component.abilities.controls[3].get('abilityTotalScore').value).toEqual(17);
  });
});
