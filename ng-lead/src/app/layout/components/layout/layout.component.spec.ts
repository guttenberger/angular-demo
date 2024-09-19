import { TestBed } from '@angular/core/testing';
import { LayoutModule } from '@layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarService } from '../sidebar/services/sidebar.service';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModule, BrowserAnimationsModule],
      providers: [SidebarService],
    }).compileComponents();
  });

  it('should create the header component', () => {
    const fixture = TestBed.createComponent(LayoutComponent);
    const layoutComponent = fixture.componentInstance;
    expect(layoutComponent).toBeTruthy();
  });
});
