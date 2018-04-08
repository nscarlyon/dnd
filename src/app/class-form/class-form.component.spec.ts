import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFormComponent } from './class-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CharacterService} from "../service/character.service";

describe('ClassFormComponent', () => {
  let component: ClassFormComponent;
  let fixture: ComponentFixture<ClassFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [CharacterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFormComponent);
    component = fixture.componentInstance;
    component.selectedClass = "Wizard";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
