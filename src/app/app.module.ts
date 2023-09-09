import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem('accessToken'),
        allowedDomains:['localhost:7229']
      }
    }),
    SocialLoginModule,
  ],
  providers: [
    {provide:'baseUrl',useValue:'https://localhost:7229/api',multi:true},
    {provide:'baseSignalRUrl',useValue:'https://localhost:7229/',},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("744071990792-nf24l0spfdogbfnm0hnurev6tivukkfv.apps.googleusercontent.com")
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("6579499812164538")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true},
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
