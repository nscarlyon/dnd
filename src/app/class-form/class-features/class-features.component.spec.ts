import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassFeaturesComponent } from './class-features.component';
import {CharacterPubSubService} from "../../service/character-pubsub.service";
import {CharacterService} from "../../service/character.service";
import {Observable, BehaviorSubject} from "rxjs";
import any = jasmine.any;

describe('ClassFeaturesComponent', () => {
  let component: ClassFeaturesComponent;
  let fixture: ComponentFixture<ClassFeaturesComponent>;
  let characterPubSubStub: any = {
    onUpdate: (): any => {
      let character = new BehaviorSubject<any>({characterPath: 'Evocation'});
      return character.asObservable();
    }
  };
  let characterServiceStub: any = {
    getCharacterPathFeatures: (): any => {
      return Observable.of([""])
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFeaturesComponent ],
      providers: [{provide: CharacterService, useValue: characterServiceStub},
                  {provide: CharacterPubSubService, useValue: characterPubSubStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
