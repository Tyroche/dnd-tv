import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampEmbedComponent } from './bootcamp-embed.component';

describe('BootcampEmbedComponent', () => {
  let component: BootcampEmbedComponent;
  let fixture: ComponentFixture<BootcampEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootcampEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootcampEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
