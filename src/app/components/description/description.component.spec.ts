import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DescriptionComponent } from './description.component';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct main title', () => {
    const title = fixture.debugElement.query(By.css('#title')).nativeElement;
    expect(title.textContent).toContain('FOR A MORE CONSCIOUS CHOICE,');
    expect(title.textContent).toContain('FOR');
    expect(title.textContent).toContain('A MORE SUSTAINABLE FUTURE !');
  });

  it('should have the correct text in paragraphs', () => {
    const paragraphs = fixture.debugElement.queryAll(By.css('.text'));
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].nativeElement.textContent).toContain("Thanks to the ''GOCLIMATE'' API (\"https://api.goclimate.com/docs\"), we can always be informed about the impact of our air travel !");
    expect(paragraphs[1].nativeElement.textContent).toContain("This platform allows you to calculate the amount of CO2 produced per passenger by air travel.");
  });

  it('should display the correct company data', () => {
    const companyDataTitles = fixture.debugElement.queryAll(By.css('.dateTitle'));
    const companyDataValues = fixture.debugElement.queryAll(By.css('.date'));

    expect(companyDataTitles.length).toBe(3);
    expect(companyDataValues.length).toBe(3);

    expect(companyDataTitles[0].nativeElement.textContent).toBe('Company that pollutes the most:');
    expect(companyDataValues[0].nativeElement.textContent).toContain('AMERICAN AIRLINES:');
    expect(companyDataValues[0].nativeElement.textContent).toContain('79,41g di CO2/ASK');

    expect(companyDataTitles[1].nativeElement.textContent).toBe('Company that pollutes less:');
    expect(companyDataValues[1].nativeElement.textContent).toContain('WIZZ AIR:');
    expect(companyDataValues[1].nativeElement.textContent).toContain('52,57g di CO2/ASK');

    expect(companyDataTitles[2].nativeElement.textContent).toBe('Company with older aircraft:');
    expect(companyDataValues[2].nativeElement.textContent).toContain('BRITISH AIRWAYS:');
    expect(companyDataValues[2].nativeElement.textContent).toContain('Boeing 747-400s');
  });

  it('should display the footer correctly', () => {
    const footer = fixture.debugElement.query(By.css('.footer')).nativeElement;
    expect(footer.textContent).toContain('Developed by GM (Giorgio Marian) 2024');
    const linkedInLink = fixture.debugElement.query(By.css('.footer a')).nativeElement;
    expect(linkedInLink.href).toBe('https://www.linkedin.com/in/giorgio-marian');
    expect(linkedInLink.textContent).toBe('qui!');
  });
});
