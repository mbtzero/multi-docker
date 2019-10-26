import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})   // instead of adding to providers - only one instance for the whole app
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  baseURL = 'http://localhost:5600'
  //baseURL = 'http://localhost:8080'
  //baseURL = 'http://mygreenprofile.com';
  postAPI = this.baseURL + '/api/posts/';
  postAPIAdmin = this.baseURL + '/api/admin/posts/';


  getPosts() {
    this.http.get<{message: string, posts: any}>(this.postAPI)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            creator: post.creator,
            visible: post.visible,
            pts1title: post.pts1title,
            pts1points: post.pts1points,
            pts2title: post.pts2title,
            pts2points: post.pts2points,
            pts3title: post.pts3title,
            pts3points: post.pts3points,
          };
        });
      }))
      .subscribe((transformedPosts) => {
            console.log(transformedPosts)
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
  }

  getPostsAdmin() {
    this.http.get<{message: string, posts: any}>(this.postAPIAdmin)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            creator: post.creator,
            visible: post.visible,
          };
        });
      }))
      .subscribe((transformedPosts) => {
        console.log(transformedPosts)
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string, visible: string,
           pts1title: string, pts1points: string,
           pts2title: string, pts2points: string,
           pts3title: string, pts3points: string) {
    const post: Post = { id: null,
      title: title,
      content: content,
      visible: visible,
      pts1title: pts1title,
      pts1points: pts1points,
      pts2title: pts2title,
      pts2points: pts2points,
      pts3title: pts3title,
      pts3points: pts3points,
    };

    this.http.post<{message: string}>(this.postAPI, post).
      subscribe( (responseData) => {
     // mbt   this.posts.push(post);
     // mbt   this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
    });


  }

  deletePost(postId: string) {
    this.http.delete(this.postAPI + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }
}
