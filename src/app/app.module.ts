import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CirclesComponent } from './circles/circles.component';
import { LinearComponent } from './linear/linear.component';
import { RandomWalkerComponent } from './random-walker/random-walker.component';
import { WalkerObjectifiedComponent } from './walker-objectified/walker-objectified.component';
import { BlueWalker } from './blue-walker.component';
import { GreenWalker } from './green-walker.component';

@NgModule({
  declarations: [
    AppComponent,
    CirclesComponent,
    LinearComponent,
    RandomWalkerComponent,
    WalkerObjectifiedComponent,
    BlueWalker,
    GreenWalker
  ],
  imports: [ BrowserModule, FormsModule, AppRoutingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
