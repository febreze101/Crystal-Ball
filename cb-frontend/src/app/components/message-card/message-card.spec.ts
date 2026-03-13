import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCard } from './message-card';

describe('MessageCard', () => {
  let component: MessageCard;
  let fixture: ComponentFixture<MessageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
