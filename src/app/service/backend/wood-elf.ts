import {Elf} from "./elf";
import {Race} from "../../shared/race";

export class WoodElf extends Elf implements Race {
  displayName: string = "Wood Elf";

  constructor() {
    super();
    this.wisdom+=1;
  }
}
