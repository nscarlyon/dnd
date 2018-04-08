import {Race} from "../../shared/race";
import {Gnome} from "./gnome";

export class RockGnome extends Gnome implements Race {
  displayName: string = "Rock Gnome";

  constructor() {
    super();
    this.constitution+=1;
  }
}
