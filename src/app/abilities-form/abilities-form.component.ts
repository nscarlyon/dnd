import {Component, OnInit} from '@angular/core';
import {Race} from "../shared/race";
import {CharacterService} from "../service/character.service";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {FormBuilder, FormArray, FormGroup, FormControl} from "@angular/forms";
import {Ability} from "../shared/ability";
import ableToSwitchToFrame = until.ableToSwitchToFrame;
import {until} from "selenium-webdriver";

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
    })
  }

  createAbilitiesForm() {
    this.abilitiesForm = this.fb.group({

    });
  }

  goToPageThree(): void {
    this.router.navigate(["3"]);
  }

  goToPageOne(): void {
    this.router.navigate([""]);
  }
}
