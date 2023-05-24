import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginInputComponent } from './login/login-input/login-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OverlayComponent } from './overlay/overlay.component';
import { TextInputComponent } from './text-input/text-input.component';
import { UsersComponent } from './users/users.component';
import { AnnouncementCardComponent } from './announcements/announcement-card/announcement-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginInputComponent,
    SelectCompanyComponent,
    AnnouncementsComponent,
    NavbarComponent,
    OverlayComponent,
    TextInputComponent,
    UsersComponent,
    AnnouncementCardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
