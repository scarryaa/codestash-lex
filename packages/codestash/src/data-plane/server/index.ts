import http from 'http';

export class DataPlaneServer {
    constructor(public server: http.Server) { }
}