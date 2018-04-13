import { Component, OnInit } from '@angular/core';
import {CharacterService} from "../service/character.service";
import {CharacterPubSubService} from "../service/character-pubsub.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})

export class ClassFormComponent implements OnInit {
  savedCharacterForm: any;
  classForm: FormGroup;
  characterPaths: any;

  constructor(private characterPubSub: CharacterPubSubService,
              private characterService: CharacterService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.savedCharacterForm = this.characterPubSub.getValue();
    this.characterService.getClass(this.savedCharacterForm.characterClass).subscribe((characterClass: any) => {
      this.characterPaths = characterClass.arcaneTraditions;
      this.createClassForm();
      this.onChanges();
    })
  }

  private createClassForm() {
    this.classForm = this.fb.group({
      characterPath: [this.characterPaths[0]]
    });
    this.savedCharacterForm.characterPath = this.characterPaths[0];
    this.characterPubSub.update(this.savedCharacterForm);
  }

  get characterPath(): any {
    return this.classForm.get('characterPath');
  }

  private onChanges() {
    this.characterPath
      .valueChanges
      .subscribe((change) => {
        this.savedCharacterForm.characterPath = change;
        this.characterPubSub.update(this.savedCharacterForm);
      });
  }

  goToPageTwo(): void {
    this.router.navigate(["2"]);
  }
}
