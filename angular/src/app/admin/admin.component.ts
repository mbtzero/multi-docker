import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import {PostListComponent} from '../posts/post-list/post-list.component';




@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent {
  @Input() hero: PostListComponent;
}
