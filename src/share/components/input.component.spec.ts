import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl } from '@angular/forms';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputComponent],
      providers: [
        {
          provide: NgControl,
          useValue: {
            control: {
              errors: [],
              setValidators: () => {},
              setAsyncValidators: () => {},
              updateValueAndValidity: () => {},
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.placeholder = 'Test Placeholder';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent.trim()).toBe('Test Label');
  });

  it('should render placeholder correctly', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('placeholder')).toBe('Test Placeholder');
  });
});
