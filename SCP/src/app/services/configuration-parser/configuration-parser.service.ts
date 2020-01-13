import { Injectable } from '@angular/core';
import { IEdge } from './IEdge';
import { EdgeTypes } from './EdgeTypes';
import { IDecendants } from './IDecendants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationParserService {

  constructor() { }

  public parse(configuration: String): IEdge[] {
    if (configuration.length == 0) {
      return [];
    }

    const edges = this.processLevel(configuration, []);
    return this.validateEdges(edges) ? edges : [];
  }

  private processLevel(configuration: String, decendants: IDecendants[]): IEdge[] {
    if (this.isLeaf(configuration)) {
      return this.parseLeafLevel(configuration);
    } else if (this.isBranch(configuration)) {
      return this.processBranch(configuration, decendants);
    } else {
      return this.parseBranchLevel(configuration, decendants);
    }
  }

  private isLeaf(configuration: String): boolean {
    return configuration.indexOf(')') < 0 && configuration.indexOf('*') < 0;
  }

  private isBranch(configuration: String): boolean {
    return configuration.indexOf(')') > 0;
  }

  private processBranch(configuration: String, decendants: IDecendants[]): IEdge[] {
    const firstClosing = configuration.indexOf(')');
    const lastOpening = configuration
      .substr(0, firstClosing)
      .lastIndexOf('(');
    const level = configuration.substr(lastOpening + 1, firstClosing - lastOpening - 1);
    const remainingConfig = configuration.substr(0, lastOpening) + '*' +
      configuration.substr(firstClosing + 1);
    const decendant: IDecendants = {
      items: this.isLeaf(level) ? this.parseLeafLevel(level) : this.parseBranchLevel(level, decendants)
    };
    decendants.push(decendant);
    return this.processLevel(remainingConfig, decendants);

  }

  private parseBranchLevel(level: String, decendents: IDecendants[]): IEdge[] {
    const edges = [];
    let remainingLevel = level;
    while (remainingLevel.length >= 5) {
      const newEdge = this.extractBranchEdge(remainingLevel, decendents)
      edges.push(newEdge);
      if (newEdge.leftChildren) {
        decendents.shift;
      }
      remainingLevel = remainingLevel.substr(4);
    }

    decendents = [];
    return edges;
  }

  private parseLeafLevel(level: String): IEdge[] {
    const regex = /[v|h]\d\d/g;
    const found = level.match(regex);
    return found != null ? found.map(edgeData => this.extractLeafEdge(edgeData)) : []
  }

  private extractLeafEdge(edgeData: String): IEdge {
    return {
      type: this.extractType(edgeData),
      location: this.extractLocation(edgeData),
      leftChildren: [],
      rightChildren: [],
    }


  }

  private extractBranchEdge(remainingLevel: String, decendents: IDecendants[]): IEdge {
    const edgeData = remainingLevel.substr(1, 3);
    const hasLeftDecedants = remainingLevel.substr(0, 1) == '*';
    const hasRightDecendants = remainingLevel.substr(4, 1) == '*';
    const edge: IEdge = {
      type: this.extractType(edgeData),
      location: this.extractLocation(edgeData)
    }
    if (hasLeftDecedants) {
      edge.leftChildren = decendents[0] ? decendents[0].items: [];
      decendents.shift();
    }
    if (hasRightDecendants) {
      edge.rightChildren = decendents[0] ? decendents[0].items: [];
    }
    return edge;
  }

  private extractType(edgeData: string): EdgeTypes {
    return edgeData.substr(0, 1) == 'v' ? EdgeTypes.VERTICAL : EdgeTypes.HORIZON;
  }

  private extractLocation(edgeData: string): number {
    return parseInt(edgeData.substr(1));
  }

  validateEdges(edges: IEdge[]): boolean {
    return true;
    if (edges.length == 0) {
      return false;
    }

    const firstType = edges[0].type;
    const allSameType = edges.every(edge => edge.type == firstType);
    const lowerThan100 = edges.every(edge => edge.location < 100);
    return allSameType && lowerThan100;
  }
}
