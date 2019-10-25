import { Component, EventEmitter, Output } from '@angular/core';

import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['post-create.component.css']
})

export class PostCreateComponent {


  enteredTitle = '';
  enteredContent = '';

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.addPosts(form.value.title,
      form.value.content,
      '1',
      form.value.pts1title,
      form.value.pts1points,
      form.value.pts2title,
      form.value.pts2points,
      form.value.pts3title,
      form.value.pts3points,
  );
    form.resetForm();
  }


}
