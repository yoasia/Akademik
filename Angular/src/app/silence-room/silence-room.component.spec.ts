import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilenceRoomComponent } from './silence-room.component';

describe('SilenceRoomComponent', () => {
  let component: SilenceRoomComponent;
  let fixture: ComponentFixture<SilenceRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilenceRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilenceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
