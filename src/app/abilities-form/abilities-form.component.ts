import {Component, OnInit} from '@angular/core';
import {Race} from "../shared/race";
import {CharacterService} from "../service/character.service";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {FormBuilder, FormArray, FormGroup} from "@angular/forms";
import {Ability} from "../shared/ability";

@Component({
  selector: 'app-abilities-form',
  templateUrl: './abilities-form.component.html',
  styleUrls: ['./abilities-form.component.css']
})

export class AbilitiesFormComponent implements OnInit {
  characterRace: Race;
  savedCharacterForm: any;
  abilitiesForm: FormGroup;

  constructor(private characterService: CharacterService,
              private characterPubSub: CharacterPubSubService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.setRace();
  }

  setRace() {
    this.savedCharacterForm = this.characterPubSub.getValue();
    this.characterService.getRace(this.savedCharacterForm.characterRace).subscribe((race: Race) => {
      this.characterRace = race;
      this.createAbilitiesForm();
      this.autoSave();
    })
  }

  createAbilitiesForm() {
    let abilitiesArray: FormArray = this.savedCharacterForm.abilities;

    if (abilitiesArray.length == 0) {
      abilitiesArray = this.fb.array([
        this.fb.group(new Ability("Strength", this.characterRace.strength)),
        this.fb.group(new Ability("Dexterity", this.characterRace.dexterity)),
        this.fb.group(new Ability("Constitution", this.characterRace.constitution)),
        this.fb.group(new Ability("Intelligence", this.characterRace.intelligence)),
        this.fb.group(new Ability("Wisdom", this.characterRace.wisdom)),
        this.fb.group(new Ability("Charisma", this.characterRace.charisma))
      ]);
    }

    this.abilitiesForm = this.fb.group({
      abilities: abilitiesArray
    });
  }

  get abilities(): FormArray {
    return this.abilitiesForm.get('abilities') as FormArray;
  }

  autoSave() {
    this.abilities.controls.forEach((ability) => {
      ability.valueChanges
              .debounceTime(500)
              .subscribe(() => {
                this.savedCharacterForm.abilities = this.abilities;
                this.characterPubSub.update(this.savedCharacterForm);
              })
    })
  }

  goToPageThree(): void {
    this.router.navigate(["3"]);
  }

  goToPageOne(): void {
    this.router.navigate([""]);
  }
}
