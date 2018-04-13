import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {RaceSelection} from "../shared/race-selection";
import {ForestGnome} from "./backend/forest-gnome";
import {RockGnome} from "./backend/rock-gnome";
import {Wizard} from "./backend/wizard";
import {Race} from "../shared/race";
import {DarkElf} from "./backend/dark-elf";
import {HighElf} from "./backend/high-elf";
import {WoodElf} from "./backend/wood-elf";
import {CharacterClass} from "../shared/character-class";

@Injectable()
export class CharacterService {
  milliSeconds: number = 500;

  constructor() { }

  getLevels(): Observable<number[]> {
    return Observable.of([1, 2]);
  }

  getClasses(): Observable<string[]> {
    return Observable.of(["Barbarian", "Wizard"]).delay(this.milliSeconds);
  }

  getRaces(): Observable<RaceSelection[]> {
    return Observable.of([
      new RaceSelection("Gnome", ["Forest Gnome", "Rock Gnome"]),
      new RaceSelection("Elf", ["High Elf", "Wood Elf", "Dark Elf"])
    ]).delay(this.milliSeconds);
  }

  getRace(race: string): Observable<Race> {
    if(race == "Forest Gnome") {
      return Observable.of(new ForestGnome()).delay(this.milliSeconds);
    }
    if(race == "Rock Gnome") {
      return Observable.of(new RockGnome()).delay(this.milliSeconds);
    }
    if(race == "Dark Elf") {
      return Observable.of(new DarkElf()).delay(this.milliSeconds);
    }
    if(race == "High Elf") {
      return Observable.of(new HighElf()).delay(this.milliSeconds);
    }
    if(race == "Wood Elf") {
      return Observable.of(new WoodElf()).delay(this.milliSeconds);
    }
  }

  getClass(selectedClass: string): Observable<CharacterClass> {
    if(selectedClass == "Wizard") {
      return Observable.of(new Wizard()).delay(this.milliSeconds);
    }
  }

  getCharacterPathFeatures(characterPath: string): Observable<any> {
    if(characterPath == "Evocation") {
      return Observable.of(["Evocation Savant", "Sculpt Spells", "Potent Cantrip"]).delay(this.milliSeconds);
    }
    if(characterPath == "Illusion") {
      return Observable.of(["Illusion Savant", "Improved Minor Illusion", "Malleable Illusion"]).delay(this.milliSeconds);
    }
  }
}
