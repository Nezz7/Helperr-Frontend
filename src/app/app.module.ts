import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './template/template.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { AllMessagesComponent } from './all-messages/all-messages.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { FormRequestComponent } from './form-request/form-request.component';
import { routing } from './app.routing';
import { HelpyouComponent } from './helpyou/helpyou.component';
import { HelpmeComponent } from './helpme/helpme.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TokensComponent } from './tokens/tokens.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { HelpService } from './help.service';




@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    NavBarComponent,
    ProfileComponent,
    AllMessagesComponent,
    ProfileSettingComponent,
    FormRequestComponent,
    HelpyouComponent,
    HelpmeComponent,
    NotificationsComponent,
    TokensComponent,
    SinginComponent,
    SingupComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthService,UserService,PostService,HelpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
