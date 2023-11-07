import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { toStringHDMS } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ApplicationService } from 'src/app/services/common/models/application.service';
import { Address } from 'src/app/contracts/address-settings/address';
import { AddressService } from 'src/app/services/common/models/address.service';
@Component({
  selector: 'app-address-settings',
  templateUrl: './address-settings.component.html',
  styleUrls: ['./address-settings.component.scss']
})
export class AddressSettingsComponent implements OnInit {
  @ViewChild('harita', { static: true }) mapElement: ElementRef;
  map: Map;
  vectorLayer: VectorLayer<VectorSource>;
  vectorSource: VectorSource;
  address:Address = new Address();
  userId=localStorage.getItem('userId');

  constructor(private applicationService:ApplicationService,
    private addressService:AddressService) { }
    userHasAddress:any;

  async ngOnInit() {
    this.requestLocationPermission()
    const data:any = await this.addressService.checkAddressForUser(this.userId,()=>{
      alert("hata yok")
    },(err)=>{
      
    })
    this.userHasAddress=data.address;
    
  }




  generateMap(lat:any,lon:any) {
    const centerCoordinate = fromLonLat([lon, lat]); 

    const view = new View({
      center: centerCoordinate,
      zoom: 18,
    });

    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: view,
    });

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
    this.map.addLayer(this.vectorLayer);

    this.map.on('click', (event) => {
      const x = event.coordinate;
      const coordinates = toLonLat(event.coordinate);
      const [lon, lat] = coordinates;
      this.getAddressFromCoordinates(lat,lon);
      this.addIcon(x);
    });
  }

  addIcon(coordinates: number[]) {
    // Önce mevcut simgeleri temizle
    this.vectorSource.clear();

    const iconFeature = new Feature({
      geometry: new Point(coordinates),
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: '../../../../../assets/placeholder (1).png', // Kullanmak istediğiniz simge dosyasının yolunu verin
      }),
    });

    iconFeature.setStyle(iconStyle);
    this.vectorSource.addFeature(iconFeature);
  }
  async getAddressFromCoordinates(lat: number, lon: number) {
   var data:any = await  this.applicationService.getAddressFromCoordinates(lat,lon);
   
    const addressData:any= data.features[0].properties.geocoding;

    this.address.city=addressData.admin.level4;
    this.address.country=addressData.country;
    this.address.label=addressData.label;
    this.address.name=addressData.name? addressData.name :'';
    this.address.county=addressData.admin.level6;
    
    
    
  }
  requestLocationPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Kullanıcının konumunu başarıyla aldık
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.generateMap(lat,lon);

          // Konum izni aldıktan sonra yapılacak işlemleri burada gerçekleştirebilirsiniz.
          this.getAddressFromCoordinates(lat, lon);
        },
        (error) => {
          console.error('Konum izni reddedildi veya bir hata oluştu.', error);
        }
      );
    } else {
      console.error('Tarayıcı konum API desteklemiyor.');
    }
  }
 
}
