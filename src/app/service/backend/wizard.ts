import {SpellOption} from "../../shared/spell-option";
import {FormOption} from "../../shared/form-option";
import {CharacterClass} from "../../shared/character-class";

export class Wizard implements CharacterClass {
  specialFormOption: FormOption = new SpellOption();
}
