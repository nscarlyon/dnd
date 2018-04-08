import {FormOption} from "./form-option";

export class SpellOption implements FormOption {
  type: string = "spellOption";
  value: any[] = [
      {
        level: "cantrips",
        spells: ["minor illusion", "fire bolt"]
      },
      {
        level: "1",
        spells: ["feather fall", "chromatic orb"]
      }
    ];
}
