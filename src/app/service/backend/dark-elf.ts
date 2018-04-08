import {Race} from "../../shared/race";
import {Elf} from "./elf";

export class DarkElf extends Elf implements Race {
  displayName: string = "Dark Elf";

  constructor() {
    super();
    this.charisma+=1;
  }
}

