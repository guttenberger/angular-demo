import { TestBed } from '@angular/core/testing';
import { ResponsiveService } from './responsive.service';
import { MediaMatcher } from '@angular/cdk/layout';

describe('ResponsiveService', () => {
  let service: ResponsiveService;
  let mediaMatcherMock: { matchMedia: jasmine.Spy };
  let mockMediaQueryList: {
    matches: boolean;
    addEventListener: jasmine.Spy;
    removeEventListener: jasmine.Spy;
    addListener: jasmine.Spy;
    removeListener: jasmine.Spy;
  };

  beforeEach(() => {
    // Mock the MediaQueryList with addEventListener and removeEventListener
    mockMediaQueryList = {
      matches: false,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
      addListener: jasmine.createSpy('addListener'),
      removeListener: jasmine.createSpy('removeListener'),
    };

    // Mock MediaMatcher to return the mocked MediaQueryList
    mediaMatcherMock = {
      matchMedia: jasmine
        .createSpy('matchMedia')
        .and.returnValue(mockMediaQueryList),
    };

    TestBed.configureTestingModule({
      providers: [
        ResponsiveService,
        { provide: MediaMatcher, useValue: mediaMatcherMock },
      ],
    });

    service = TestBed.inject(ResponsiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly initialize media query listener', () => {
    // Ensure the matchMedia method was called with the expected query
    expect(mediaMatcherMock.matchMedia).toHaveBeenCalledWith(
      '(max-width: 600px)',
    );

    // Check if the correct event listener has been attached
    expect(mockMediaQueryList.addEventListener).toHaveBeenCalled();
  });

  it('should update the mobile status on initialization', () => {
    // By default, mockMediaQueryList.matches is false, so the first emitted value should be false
    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeFalse();
    });
  });

  it('should emit true when screen width is mobile size', () => {
    // Change the media query match to true (simulate mobile)
    mockMediaQueryList.matches = true;
    service['updateMobileStatus'](); // Call the private method to trigger status update

    service.isMobile$.subscribe((isMobile) => {
      expect(isMobile).toBeTrue();
    });
  });

  it('should remove event listener on ngOnDestroy', () => {
    service.ngOnDestroy();

    // Ensure the removeEventListener was called
    expect(mockMediaQueryList.removeEventListener).toHaveBeenCalled();
  });
});
