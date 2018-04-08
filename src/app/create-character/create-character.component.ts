import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl} from "@angular/forms";
import {CharacterService} from "../service/character.service";
import {RaceSelection} from "../shared/race-selection";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})

export class CreateCharacterComponent implements OnInit {
  characterForm: FormGroup;
  levels: number[];
  classes: string[];
  races: RaceSelection[];
  savedCharacterForm: any;

  constructor(private formBuilder: FormBuilder,
              private characterService: CharacterService,
              private characterPubSub: CharacterPubSubService,
              private router: Router) {
  }

  ngOnInit() {
    this.savedCharacterForm = this.characterPubSub.getValue();
    this.setLevels();
    this.setClasses();
    this.setRaces();
  }

  setLevels(): void {
    this.characterService.getLevels().subscribe((levels: number[]) => {
      this.levels = levels;
    });
  }

  setClasses(): void {
    this.characterService.getClasses().subscribe((classes: string[]) => {
      this.classes = classes;
    });
  }

  setRaces(): void {
    this.characterService.getRaces().subscribe((races: RaceSelection[]) => {
      this.races = races;
      this.createCharacterForm();
    });
  }

  createCharacterForm(): void {
    this.setNullSavedCharacterForm();
    this.characterForm = this.formBuilder.group({
      characterName: [this.savedCharacterForm.characterName || "Sporkle"],
      characterLevel: this.savedCharacterForm.characterLevel,
      characterClass: this.savedCharacterForm.characterClass,
      characterRace: this.savedCharacterForm.characterRace
    });
    this.onChanges();
  }

  onChanges(): void {
    this.characterRace.valueChanges.subscribe((change: any) => {
      this.savedCharacterForm.characterRace = change;
      this.savedCharacterForm.abilities = [];
      this.characterPubSub.update(this.savedCharacterForm);
    });

    this.characterForm.valueChanges.subscribe((valueChanges: any) => {
      this.savedCharacterForm.characterLevel = valueChanges.characterLevel;
      this.savedCharacterForm.characterName = valueChanges.characterName;
      this.savedCharacterForm.characterClass = valueChanges.characterClass;
      this.characterPubSub.update(this.savedCharacterForm);
    });
  }

  setNullSavedCharacterForm(): void {
    if (this.savedCharacterForm == null) {
      this.savedCharacterForm = {
        characterName: "Sporkle",
        characterLevel: this.levels[0],
        characterClass: this.classes[0],
        characterRace: this.races[0].subRaces[0],
        abilities: []
      };
      this.characterPubSub.update(this.savedCharacterForm);
    }
  }

  get characterRace(): AbstractControl {
    return this.characterForm.get('characterRace');
  }

  goToAbilitiesForm(): void {
    this.router.navigate(['/2']);
  }
}
