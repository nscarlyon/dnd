import {BehaviorSubject, Observable} from "rxjs";

export class CharacterPubSubService {
  protected savedCharacterForm: BehaviorSubject<any>;
  protected observable: Observable<any>;

  constructor() {
    this.savedCharacterForm = new BehaviorSubject<any>(null);
    this.observable = this.savedCharacterForm.asObservable();
  }

  update(object?: any): void {
    this.savedCharacterForm.next(object);
  }

  getValue(): any {
    return this.savedCharacterForm.getValue();
  }

  onUpdate(): Observable<any> {
    return this.observable;
  }
}
