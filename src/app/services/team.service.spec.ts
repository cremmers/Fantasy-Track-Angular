import { TestBed } from '@angular/core/testing';

import { SaveTeamService } from './save-team.service';

describe('SaveTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveTeamService = TestBed.get(SaveTeamService);
    expect(service).toBeTruthy();
  });
});
