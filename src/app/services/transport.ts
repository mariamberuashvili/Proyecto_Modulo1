import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Transporte {
  getTrips(origenUsuario: [number, number], destino: [number, number]) {
    throw new Error('Method not implemented.');
  }

private urlBase = '/api-amb/transit/trips-updates/trips.bin';
  constructor(private http: HttpClient) {}

  getTripsBinary(): Observable<ArrayBuffer> {
    return this.http.get(this.urlBase, {
      responseType: 'arraybuffer'
    });
  }
}