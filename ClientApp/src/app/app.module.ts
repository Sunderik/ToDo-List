import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    TextareaAutosizeModule,
    AlertModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
