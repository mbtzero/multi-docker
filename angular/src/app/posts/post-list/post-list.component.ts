import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import {AuthService} from '../../auth/auth.service';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, public postsService: PostsService) {}
  private authListnerSubs: Subscription;
  userIsAuthenticated = false;

  userId: string;

  posts: Post[] = [];

  private postsSub: Subscription;


  ngOnInit() {
    // angular will execute when creates component - do inits
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );

    this.authListnerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authListnerSubs.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
