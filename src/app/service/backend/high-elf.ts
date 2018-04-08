import {Race} from "../../shared/race";
import {Elf} from "./elf";

export class HighElf extends Elf implements Race {
  displayName: string = "High Elf";

  constructor() {
    super();
    this.intelligence+=1;
  }
}
