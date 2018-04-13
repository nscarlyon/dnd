import { Component, OnInit } from '@angular/core';
import {CharacterPubSubService} from "../../service/character-pubsub.service";
import {CharacterService} from "../../service/character.service";

@Component({
  selector: 'app-class-features',
  templateUrl: './class-features.component.html',
  styleUrls: ['./class-features.component.css']
})
export class ClassFeaturesComponent implements OnInit {
  characterFeatures: any;

  constructor(private characterPubSub: CharacterPubSubService,
              private characterService: CharacterService) { }

  ngOnInit() {
    this.characterPubSub.onUpdate().subscribe((response) => {
      if(response.characterPath) {
        this.characterService.getCharacterPathFeatures(response.characterPath).subscribe((characterFeatures) => {
          this.characterFeatures = characterFeatures;
        });
      }
    })
  }
}
