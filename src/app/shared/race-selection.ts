import {Race} from "./race";

export class RaceSelection {
  parentRace: string;
  subRaces: string[];

  constructor(parentRace: string, subRaces: string[]) {
    this.parentRace = parentRace;
    this.subRaces = subRaces;
  }
}
