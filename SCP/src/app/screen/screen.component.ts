import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IEdge } from '../services/configuration-parser/IEdge';
import { DrawingService } from '../services/drawing/drawing.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
  private _edges: IEdge[];
  @ViewChild('canvasElement', {static: true})
  canvasElement: ElementRef;

  constructor(private drawer: DrawingService) { }

  @Input() 
  set edges(newEdges: IEdge[]) {
    this.drawer.draw(newEdges, this.canvasElement.nativeElement);
  }

  ngOnInit() {
  }

}
