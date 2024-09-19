import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { leadResolver } from './lead.resolver';

describe('leadResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => leadResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
