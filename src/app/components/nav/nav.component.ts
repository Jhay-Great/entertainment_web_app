import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Output () display:EventEmitter<boolean> = new EventEmitter;

  constructor (
    private router: Router,
    private cdf: ChangeDetectorRef,
  ) {};

  ngOnInit(): void {
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
