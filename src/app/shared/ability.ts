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
    this.onChanges();
  }

  private onChanges() {
    this.abilityStat.valueChanges.subscribe((abilityStat) => {
      let abilityTotalScore: number = Number(abilityStat) + Number(this.raceModifier.value);
      let abilityModifier: number = Math.floor((abilityTotalScore - 10) / 2);
      this.abilityTotalScore.patchValue(abilityTotalScore);
      this.abilityModifier.patchValue(abilityModifier);
    })
  }
}
