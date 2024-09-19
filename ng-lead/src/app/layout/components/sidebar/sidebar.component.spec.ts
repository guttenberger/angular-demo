import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@layout/layout.module';
import { SidebarService } from '../sidebar/services/sidebar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModule, BrowserAnimationsModule],
      providers: [SidebarService],
    }).compileComponents();
  });

  it('should create the header component', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const sidebarComponent = fixture.componentInstance;
    expect(sidebarComponent).toBeTruthy();
  });
});
