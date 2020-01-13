import { Injectable } from '@angular/core';
import { IEdge } from '../configuration-parser/IEdge';
import { ColorProviderService } from '../colorProvider/color-provider.service';
import { EdgeTypes } from '../configuration-parser/EdgeTypes';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor(private colors: ColorProviderService) { }

  draw(edges: IEdge[], canvas: HTMLCanvasElement): void {
    this.clearCavnas(canvas);
    edges.forEach(edge => this.drawEdge(edge, canvas))
  }

  private drawEdge(edge: IEdge, canvas: HTMLCanvasElement): void {
    if (edge.type == EdgeTypes.HORIZON) {
      this.privateDrawHorizontalEdge(edge.location, canvas);
    } else {
      this.drawVerticalEdge(edge.location, canvas);
    }
    if (edge.leftChildren) {
      edge.leftChildren.forEach(edge => this.drawEdge(edge, canvas))
    }
    if (edge.rightChildren) {
      edge.rightChildren.forEach(edge => this.drawEdge(edge, canvas))
    }
  }

  private drawVerticalEdge(location: number, canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = this.colors.getColor();
    const edgeCoordinate = canvas.width * location / 100;
    ctx.moveTo(edgeCoordinate, 0);
    ctx.lineTo(edgeCoordinate, canvas.height);
    ctx.stroke();
  }

  private privateDrawHorizontalEdge(location: number, canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = this.colors.getColor();
    const edgeCoordinate = canvas.height * location / 100;
    ctx.moveTo(0, edgeCoordinate);
    ctx.lineTo(canvas.width, edgeCoordinate);
    ctx.stroke();
  }

  private clearCavnas(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
