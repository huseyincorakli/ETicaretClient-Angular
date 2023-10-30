import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule,ComponentsModule,RouterModule,MatSidenavModule,MatButtonModule,MatIconModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
