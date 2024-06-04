import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent]
    }).compileComponents();

    debugElement = TestBed.createComponent(DashboardComponent).debugElement;
  });

  it('should create', () => {
    const component = debugElement.componentInstance;
    expect(component).toBeTruthy();
  });


  it('should have the title "SkyImpact"', () => {
    const title = debugElement.query(By.css('#title')).nativeElement;
    expect(title.textContent).toBe('SkyImpact');
  });

  it('should have a link to description with text "HOME"', () => {
    const homeLink = debugElement.query(By.css('a[routerLink="/description"]')).nativeElement;
    expect(homeLink.textContent).toBe('HOME');
  });

  it('should have a link to home with text "FOOTPRINT"', () => {
    const footprintLink = debugElement.query(By.css('a[routerLink="/home"]')).nativeElement;
    expect(footprintLink.textContent).toBe('FOOTPRINT');
  });
});
