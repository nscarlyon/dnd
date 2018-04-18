import {BehaviorSubject, Observable} from "rxjs";

export class CharacterPubSubService {
  protected savedCharacterForm: BehaviorSubject<any>;

  constructor() {
    this.savedCharacterForm = new BehaviorSubject<any>(null);
  }

  update(object?: any): void {
    this.savedCharacterForm.next(object);
  }

  onUpdate(): Observable<any> {
    return this.savedCharacterForm.asObservable();
  }

  getValue(): any {
    return this.savedCharacterForm.getValue();
  }
}
