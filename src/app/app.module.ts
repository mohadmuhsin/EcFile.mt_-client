import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { userGuard } from './user/guard/user.guard';
import { adminGuard } from './admin/guard/admin.guard';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '388337914298-q3chr72v1usbeh6mdira91pa9gtg0rnt.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorInterceptor,
    multi:true
  },
  userGuard,
  adminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
