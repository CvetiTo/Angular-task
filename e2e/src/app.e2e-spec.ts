import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { TestBed, async } from '@angular/core/testing';

describe('workspace-project App', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppPage
      ],
    }).compileComponents();
  }));

  it('should display welcome message', async(() => {
    const fixture = TestBed.createComponent(AppPage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-spacex-graphql-codegen app is running!');
  }));

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
