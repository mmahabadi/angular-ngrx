import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let storeMock: any;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of(100)), // Mock total$
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PaymentComponent],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values and validators', () => {
    const form = component.form;
    expect(form.get('name')?.value).toEqual('');
    expect(form.get('phone')?.value).toEqual('');
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('address')?.value).toEqual('');
    expect(form.get('city')?.value).toEqual('');
    expect(form.get('call')?.value).toEqual(false);
    expect(form.valid).toBeFalsy();

    // Test required validators
    form.setValue({
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      call: true,
    });
    expect(form.valid).toBeTruthy();
  });

  it('should render the template correctly', () => {
    const element = fixture.nativeElement;
    expect(element.querySelector('h2').textContent).toContain('Payment');
    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('app-button').textContent).toContain(
      'Order ($100.00)'
    );
  });

  it('should call onPlaceOrder method when order button is clicked', () => {
    spyOn(window, 'alert');
    const button = fixture.nativeElement.querySelector('app-button');
    button.click();
    expect(window.alert).toHaveBeenCalledWith(
      JSON.stringify({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        call: false,
      })
    );
  });
});
