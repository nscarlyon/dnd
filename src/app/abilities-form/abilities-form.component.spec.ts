import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbilitiesFormComponent } from './abilities-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ForestGnome} from "../service/backend/forest-gnome";
import {DarkElf} from "../service/backend/dark-elf";
import {CharacterService} from "../service/character.service";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('AbilitiesFormComponent', () => {
  let component: AbilitiesFormComponent;
  let fixture: ComponentFixture<AbilitiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbilitiesFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [CharacterService, CharacterPubSubService, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitiesFormComponent);
    component = fixture.componentInstance;
    component.selectedRace = new ForestGnome();
    fixture.detectChanges();
  });

  it('should get the characterRace modifier for a forest gnome', () => {
    component.createAbilitiesForm();
    expect(component.characterIntelligence.get('raceModifier').value).toEqual(2);
    expect(component.characterWisdom['controls'].raceModifier.value).toEqual(0);
    expect(component.characterCharisma['controls'].raceModifier.value).toEqual(0);
    expect(component.characterConstitution['controls'].raceModifier.value).toEqual(0);
    expect(component.characterDexterity['controls'].raceModifier.value).toEqual(1);
    expect(component.characterStrength['controls'].raceModifier.value).toEqual(0);
  });

  it('should get different characterRace modifier when the selected characterRace changes', () => {
    component.selectedRace = new DarkElf();
    component.createAbilitiesForm();
    expect(component.characterIntelligence['controls'].raceModifier.value).toEqual(0);
    expect(component.characterWisdom['controls'].raceModifier.value).toEqual(0);
    expect(component.characterCharisma['controls'].raceModifier.value).toEqual(1);
    expect(component.characterConstitution['controls'].raceModifier.value).toEqual(0);
    expect(component.characterDexterity['controls'].raceModifier.value).toEqual(2);
    expect(component.characterStrength['controls'].raceModifier.value).toEqual(0);
  });

  it('should get total intelligence ability score and ability modifier for forest gnome', () => {
    component.createAbilitiesForm();
    component.characterIntelligence.patchValue({abilityScore: 16});
    component.updateAbilityModifierAndTotalScore(component.characterIntelligence);
    expect(component.characterIntelligence.get('abilityModifier').value).toEqual(4);
    expect(component.characterIntelligence.get('abilityTotalScore').value).toEqual(18);
  });
});
