import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import {PostListComponent} from '../posts/post-list/post-list.component';




@Component({
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {
  @Input() hero: PostListComponent;
}
