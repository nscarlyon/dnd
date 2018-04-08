import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormArray} from "@angular/forms";
import {CharacterService} from "../service/character.service";
import {CharacterClass} from "../shared/character-class";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  @Input() selectedClass: string;
  classForm: FormGroup;
  characterClass: CharacterClass;

  constructor(private characterService: CharacterService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createClassForm();
  }

  createClassForm(): void {
    this.characterService.getClass(this.selectedClass).subscribe((characterClass: CharacterClass) => {
      this.characterClass = characterClass;

      let specialFormOption = this.characterClass.specialFormOption;

      if (specialFormOption.type == "spellOption") {
          let spellGroup: FormGroup[] = [];

        specialFormOption.value.forEach(s => {
          let spells: any = s.spells.map((spell) => {
            return this.formBuilder.group({
              spellName: spell,
              value: false
            });
          });

            spellGroup.push(this.formBuilder.group({
              level: s.level.toString(),
              spells: this.formBuilder.array(spells)
            }))
          });

          this.classForm = this.formBuilder.group({
            features: "feature one",
            specialOptions: this.formBuilder.array(spellGroup)
          });
        // console.log(this.specialOptions.controls[0].controls.spells.controls[0].controls.spellName.value);
      }
    });
    // console.log(this.specialOptions)
  }

  get specialOptions(): FormArray {
    return this.classForm.get('specialOptions') as FormArray;
  }
}
