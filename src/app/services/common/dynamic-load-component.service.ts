import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef : dinamik olarak yüklenecek compu içerisinde barındıran container. Her yükleme öncesinde  ==> viewContainerRef.clear();
  //ComponentFactory: componentlerin instancelarını oluşturmak için kullanılan nesnedir
  // ComponentFactoryResolver: ComponentFactory'i resolve eden nesnedir.

  constructor(private componentFactoryResolver:ComponentFactoryResolver) { }

 async loadComponent(component:ComponentType,viewContainerRef:ViewContainerRef){
    let _component:any=null;
    switch (component) {
      
      case ComponentType.BasketComponent:
        _component=(await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    }

    viewContainerRef.clear();
    return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component))
  }
}
export  enum  ComponentType{
  BasketComponent
}