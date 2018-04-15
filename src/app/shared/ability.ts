import {FormControl} from "@angular/forms";

export class Ability {
  abilityName: string;
  abilityStat: FormControl  = new FormControl(0);
  raceModifier: FormControl;
  abilityTotalScore: FormControl  = new FormControl({value: 0, disabled: true});
  abilityModifier: FormControl  = new FormControl({value: 0, disabled: true});

  constructor(abilityName: string, raceModifier: number) {
    this.abilityName = abilityName;
    this.raceModifier = new FormControl({value: raceModifier, disabled: true});
  }
}
