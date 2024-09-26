import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleVisibility]',
  standalone: true
})
export class ToggleVisibilityDirective {
  @Input () set appToggleVisibility(condition:boolean) {
    console.log('loggin renderer: ', this.renderer);
    console.log('logging native element: ', this.el.nativeElement);
    if (condition) {
      this.renderer.removeClass(this.el.nativeElement, 'hidden');
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'hidden');
      // this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }


}
