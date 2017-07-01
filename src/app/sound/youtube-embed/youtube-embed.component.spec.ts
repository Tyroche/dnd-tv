import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeEmbedComponent } from './youtube-embed.component';

describe('YoutubeEmbedComponent', () => {
  let component: YoutubeEmbedComponent;
  let fixture: ComponentFixture<YoutubeEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
