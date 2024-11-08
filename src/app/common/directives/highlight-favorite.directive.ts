import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  standalone: true,
})
export class HighlightFavoriteDirective implements OnChanges {
  @Input() appHighlightFavorite: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appHighlightFavorite) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffff99');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
