import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location.html',
  styleUrls: ['./location.css']
})
export class Location implements OnInit {
  map!: L.Map;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    // Configuración del mapa
    this.map = L.map('map').setView([41.3851, 2.1734], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        this.map.setView(coords, 16);
        
        L.marker(coords).addTo(this.map)
          .bindPopup('¡Estás aquí!')
          .openPopup();
      });
    }
  }
}