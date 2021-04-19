import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paws',
  templateUrl: './paws.component.html',
  styleUrls: ['./paws.component.scss']
})

export class PawsComponent implements OnInit {
  
  myStyle: object;
  
  @Input() color: string;
  @Input() angle: string;
  @Input() size: {width: number, height: number};
  @Input() position: {top: number, right: number};

  ngOnInit() {

    this.myStyle = {
      'width': `${this.size.width}px`,
      'height': `${this.size.height}px`,
      'transform': `rotate(${this.angle}deg)`,
      'top': `${this.position.top}em`,
      'right': `${this.position.right}em`,
    }
  }
}
