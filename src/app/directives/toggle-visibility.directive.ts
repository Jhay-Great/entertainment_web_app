import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleVisibility]',
  standalone: true
})
export class ToggleVisibilityDirective {
  @Input () set toggleVisibility(condition:boolean) {
    if (condition) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }


}
