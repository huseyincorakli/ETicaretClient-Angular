import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { Create_Address } from 'src/app/contracts/address-settings/create_address';
import { UserInfoService } from 'src/app/services/admin/user-info.service';
import { Update_Address } from 'src/app/contracts/address-settings/update_address';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
@Component({
  selector: 'app-address-settings',
  templateUrl: './address-settings.component.html',
  styleUrls: ['./address-settings.component.scss']
})
export class AddressSettingsComponent extends BaseComponent implements OnInit {
  @ViewChild('harita', { static: true }) mapElement: ElementRef;
  map: Map;
  vectorLayer: VectorLayer<VectorSource>;
  vectorSource: VectorSource;
  address: Address = new Address();
  userId = localStorage.getItem('userId');
  addressId: string;
  userHasAddress: any;
  nameSurname: any;
  initialAddress: any;
  constructor(private applicationService: ApplicationService,
    private addressService: AddressService,
    private userInfoService: UserInfoService,
    spinner: NgxSpinnerService,
    private toastr:CustomToastrService
  ) {
    super(spinner)
  }


  async ngOnInit() {
    this.showSpinner(SpinnerType.Classic)
    this.requestLocationPermission()
    const data: any = await this.addressService.checkAddressForUser(this.userId, () => {
    }, (err) => {

    })
    this.userHasAddress = data.address;
    this.nameSurname = this.userInfoService.getSharedData();
    if (this.userHasAddress != false) {
      this.initialAddress = await this.getAddress();
      this.addressId = this.initialAddress.address.id;
    }
    this.hideSpinner(SpinnerType.Classic)

  }
  async changeAddress(){
    this.initialAddress = await this.getAddress();
  }

  async getAddress(){
    return await this.addressService.getAddress(this.userId)
  }

  async updateAddress(name: HTMLInputElement, telNumber: HTMLInputElement, city: HTMLInputElement, county: HTMLInputElement, addressInfo: HTMLInputElement, directions: HTMLInputElement) {
    this.showSpinner(SpinnerType.Classic)
    const uAddress = new Update_Address();
    uAddress.addressId = this.addressId;
    uAddress.addressInfo = addressInfo.value;
    uAddress.city = city.value;
    uAddress.county = county.value;
    uAddress.directions = directions.value;
    uAddress.nameSurname = name.value;
    uAddress.telNumber = telNumber.value;
    debugger;
    await this.addressService.updateAddress(uAddress, () => {
    this.hideSpinner(SpinnerType.Classic)
    this.toastr.message('Update is success','Address is updated',ToastrMessageType.Success,ToastrPosition.TopRight)
    }, () => {
    this.hideSpinner(SpinnerType.Classic)

      alert("hata")
    })
  }

  CreateNewAddress(name: HTMLInputElement, telNumber: HTMLInputElement, city: HTMLInputElement, county: HTMLInputElement, addressInfo: HTMLInputElement, directions: HTMLInputElement) {
    this.showSpinner(SpinnerType.Classic)
    const createAddress = new Create_Address;
    createAddress.addressInfo = addressInfo.value;
    createAddress.city = city.value;
    createAddress.county = county.value;
    createAddress.directions = directions.value;
    createAddress.nameSurname = name.value;
    createAddress.telNumber = telNumber.value;
    createAddress.userId = localStorage.getItem('userId');
    this.addressService.addAddress(createAddress, () => {
    this.hideSpinner(SpinnerType.Classic)
    this.toastr.message('Added!','Address is added!',ToastrMessageType.Success,ToastrPosition.TopRight)
    this.requestLocationPermission();
    }, () => {
    this.hideSpinner(SpinnerType.Classic)
      alert('hata')
    })

  }
  generateMap(lat: any, lon: any) {
    this.hideSpinner(SpinnerType.Classic)

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
      this.getAddressFromCoordinates(lat, lon);
      this.addIcon(x);
    });
    this.hideSpinner(SpinnerType.Classic)

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
    this.showSpinner(SpinnerType.Classic)

    var data: any = await this.applicationService.getAddressFromCoordinates(lat, lon);

    const addressData: any = data.features[0].properties.geocoding;

    this.address.city = addressData.admin.level4;
    this.address.country = addressData.country;
    this.address.label = addressData.label;
    this.address.name = addressData.name ? addressData.name : '';
    this.address.county = addressData.admin.level6;
    this.hideSpinner(SpinnerType.Classic)

  }
  requestLocationPermission() {
    this.showSpinner(SpinnerType.Classic)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Kullanıcının konumunu başarıyla aldık
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.generateMap(lat, lon);

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
    this.hideSpinner(SpinnerType.Classic)

  }

}
