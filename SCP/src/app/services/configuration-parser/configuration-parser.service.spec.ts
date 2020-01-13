import { TestBed } from '@angular/core/testing';

import { ConfigurationParserService } from './configuration-parser.service';

describe('ConfigurationParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigurationParserService = TestBed.get(ConfigurationParserService);
    expect(service).toBeTruthy();
  });
});
