import {Gnome} from "./gnome";
import {Race} from "../../shared/race";

export class ForestGnome extends Gnome implements Race {
  displayName: string = "Forest Gnome";

  constructor() {
    super();
    this.dexterity+=1;
  }
}
