export interface IEdge{
    type?: string;
    location?: number;
    leftChildren?: IEdge[];
    rightChildren?: IEdge[];
}