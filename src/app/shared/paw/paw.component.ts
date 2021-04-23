import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paw',
  templateUrl: './paw.component.html',
  styleUrls: ['./paw.component.scss']
})

export class PawComponent implements OnInit {
  
  myStyle: object;
  
  @Input() color: string;
  @Input() angle: string;
  @Input() size: {width: number, height: number};
  @Input() position: {top: number, right: number};

  ngOnInit() {

    this.myStyle = {
      'width': `${this.size}px`,
      'height': `${this.size}px`,
      'transform': `rotate(${this.angle}deg)`,
      'top': `${this.position.top}em`,
      'right': `${this.position.right}em`,
    }
  }
}
