import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Transporte } from '../../services/transport';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './location.html',
  styleUrls: ['./location.css']
})
export class Location implements OnInit {

  map!: L.Map;
  markerUsuario: any;
  rutaActual: L.Polyline | null = null; // Para poder borrar la ruta anterior
  origenUsuario!: [number, number];

  // 🏪 TIENDAS
  tiendas = [
    { nombre: 'Tienda Centro', coords: [41.3851, 2.1734] },
    { nombre: 'Tienda Eixample', coords: [41.3912, 2.1620] },
    { nombre: 'Tienda Gràcia', coords: [41.4020, 2.1560] },
    { nombre: 'Tienda Poblenou', coords: [41.4036, 2.2043] }
  ];

  constructor(private transport: Transporte) {}

  ngOnInit() {
    this.initMap();
  }

  // 🗺️ CONFIGURACIÓN INICIAL DEL MAPA
  initMap() {
    this.map = L.map('map').setView([41.3851, 2.1734], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 🏪 CREAR MARCADORES DE TIENDAS
    this.tiendas.forEach((tienda) => {
      // Creamos un ID único sin espacios para el botón
      const idBoton = `btn-${tienda.nombre.replace(/\s+/g, '-')}`;

      const marker = L.marker(tienda.coords as [number, number])
        .addTo(this.map)
        .bindPopup(`
          <div style="text-align: center;">
            <b>${tienda.nombre}</b><br><br>
            <button id="${idBoton}" style="cursor:pointer; padding: 5px 10px;">
              Cómo llegar aquí
            </button>
          </div>
        `);

      // Escuchar cuando se abre el popup para conectar el botón con la función
      marker.on('popupopen', () => {
        const btn = document.getElementById(idBoton);
        if (btn) {
          btn.onclick = () => {
            this.consultarTransporte(tienda.coords as [number, number]);
          };
        }
      });
    });
  }

  // 📍 OBTENER UBICACIÓN DEL DISPOSITIVO
  obtenerUbicacion() {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      this.origenUsuario = [pos.coords.latitude, pos.coords.longitude];

      this.map.setView(this.origenUsuario, 15);

      if (this.markerUsuario) {
        this.map.removeLayer(this.markerUsuario);
      }

      this.markerUsuario = L.marker(this.origenUsuario)
        .addTo(this.map)
        .bindPopup('Estás aquí')
        .openPopup();
    }, (error) => {
      alert('Error al obtener ubicación. Asegúrate de dar permisos.');
    });
  }

  // 🚇 PROCESAR RUTA TRAS CLIC EN TIENDA
  consultarTransporte(destinoTienda: [number, number]) {
    if (!this.origenUsuario) {
      alert('Primero pulsa el botón "Mi Posición Actual"');
      return;
    }

    // Llamada al servicio (Proxy AMB)
    this.transport.getTripsBinary().subscribe({
      next: (data) => {
        console.log('Datos binarios recibidos (AMB RT)');
        // Dibujamos la ruta desde el usuario hasta la tienda pulsada
        this.dibujarRutaReal(this.origenUsuario, destinoTienda);
      },
      error: (err) => {
        console.error('Error en el proxy:', err);
        // Incluso si falla el binario, dibujamos la línea para que el usuario vea algo
        this.dibujarRutaReal(this.origenUsuario, destinoTienda);
      }
    });
  }

  // 🔵 DIBUJAR LÍNEA ENTRE USUARIO Y TIENDA SELECCIONADA
  dibujarRutaReal(origen: [number, number], destino: [number, number]) {
  // Borrar ruta anterior
  if (this.rutaActual) {
    this.map.removeLayer(this.rutaActual);
  }

  // Usamos el servicio de OSRM (Gratuito) para obtener el camino real por calles
  // Nota: OSRM usa el formato [Longitud, Latitud], por eso invertimos el orden
  const url = `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?overview=full&geometries=geojson`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates;
        
        // Convertir coordenadas de [Long, Lat] a [Lat, Long] para Leaflet
        const latLngs = coordinates.map((c: number[]) => [c[1], c[0]] as L.LatLngExpression);

        this.rutaActual = L.polyline(latLngs, {
          color: '#800080', // Color lila (típico de transporte)
          weight: 6,
          opacity: 0.8
        }).addTo(this.map);

        this.map.fitBounds(this.rutaActual.getBounds(), { padding: [50, 50] });
        
        // OPCIONAL: Mostrar información de tiempo
        const distancia = (data.routes[0].distance / 1000).toFixed(2);
        const tiempo = Math.round(data.routes[0].duration / 60);
        alert(`Distancia: ${distancia} km | Tiempo estimado: ${tiempo} min`);
      }
    })
    .catch(err => {
      console.error("Error calculando ruta real:", err);
      // Si falla, dibujamos la línea recta como plan B
      this.dibujarLineaRecta(origen, destino);
    });
}

// Plan B por si falla el servidor de rutas
dibujarLineaRecta(origen: [number, number], destino: [number, number]) {
  this.rutaActual = L.polyline([origen, destino], { color: 'red', dashArray: '5, 10' }).addTo(this.map);
}
}