import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') hilightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elementRef: ElementRef, private rederer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor =  this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver(eventData: Event) {
  //  this.rederer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.hilightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
  //  this.rederer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
}

}
