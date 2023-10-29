import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    const head = document.head;
    const insertBefore = head.insertBefore;
    head.insertBefore = <T extends Node>(
      newElement: T,
      referenceElement: Node
    ): T => {
      if (
        newElement instanceof Element &&
        newElement?.hasAttribute('href') &&
        newElement?.getAttribute('href')?.includes('fonts.googleapis')
      ) {
        return newElement;
      }

      insertBefore.call(head, newElement, referenceElement);
      return newElement;
    };

    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      region: 'pl',
      config: {
        center: {
          lat: 52.237049,
          lng: 21.017532,
        },
        restriction: {
          latLngBounds: {
            west: 14.075,
            south: 48.855,
            east: 24.155,
            north: 54.852,
          },
          strictBounds: false,
        },
        panControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        zoom: 6,
        mapId: 'ee2cd9275b9b5193',
      },
    });
  }
}