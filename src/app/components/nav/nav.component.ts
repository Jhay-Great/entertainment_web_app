import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppService } from '../../services/app-service/app.service';
import { ToggleVisibilityDirective } from '../../directives/toggle-visibility.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ToggleVisibilityDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  // @Output () display:EventEmitter<boolean> = new EventEmitter;
  isActive:boolean = false;

  constructor (
    private router: Router,
    private cdf: ChangeDetectorRef,
    private appService: AppService,
  ) {};

  ngOnInit(): void {
    // this.appService.getForm().subscribe(
    //   value => console.log('subscribed to an observable: ', value),
    // )
    // console.log('logging observable: ', this.appService.getForm());
    // this.handleFormDisplay();
  }

  // handleFormDisplay() {
  //   const currentRoute = this.router.url;
  //   if (currentRoute === 'form') {
  //     console.log('logging the state of the routes: ', currentRoute === 'form');
  //     this.display.emit(false);
  //   }
  //   else {
  //     this.display.emit(true);
  //   }
  //   this.cdf.detectChanges();
  // }
}
