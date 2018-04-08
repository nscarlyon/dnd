import { TestBed, inject } from '@angular/core/testing';

import { CharacterPubSubService } from './character-pubsub.service';

describe('CharacterPubSubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterPubSubService]
    });
  });

  it('should be created', inject([CharacterPubSubService], (service: CharacterPubSubService) => {
    expect(service).toBeTruthy();
  }));
});
