import { Component } from '@angular/core';
import { ConfigurationParserService } from './services/configuration-parser/configuration-parser.service';
import { IEdge } from './services/configuration-parser/IEdge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SCP';
  public edges: IEdge[] = [];
  constructor(private parser: ConfigurationParserService) { }

  public processConfiguration(configuration: string): void {
    this.edges = this.parser.parse(configuration);
  }
}
