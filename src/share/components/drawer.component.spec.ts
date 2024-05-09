import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';
import { DrawerService } from '../services/drawer.service';
import { of } from 'rxjs';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;
  let drawerService: DrawerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
      providers: [DrawerService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    drawerService = TestBed.inject(DrawerService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the drawer when toggle method is called', () => {
    spyOn(drawerService, 'toggle');

    component.toggle();

    expect(drawerService.toggle).toHaveBeenCalled();
  });

  it('should render badge count when badgeCount input is provided', () => {
    component.badgeCount = 5;

    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.textContent.trim()).toBe('5');
  });

  it('should not render badge count when badgeCount is not provided', () => {
    component.badgeCount = null;

    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('.absolute');
    expect(badgeElement).toBeNull();
  });

  it('should add "open" class to drawer when open$ emits true', () => {
    component.open$ = of(true);

    fixture.detectChanges();

    const drawerElement = fixture.nativeElement.querySelector('.drawer');
    expect(drawerElement.classList).toContain('open');
  });

  it('should not add "open" class to drawer when open$ emits false', () => {
    component.open$ = of(false);

    fixture.detectChanges();

    const drawerElement = fixture.nativeElement.querySelector('.drawer');
    expect(drawerElement.classList).not.toContain('open');
  });
});
