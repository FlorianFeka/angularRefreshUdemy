import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching = true;
  error = null;
  private errorSubscription: Subscription;

  constructor(private http: HttpClient,
    private postService: PostService) {}

  ngOnInit() {
    this.errorSubscription = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.onFetchPosts();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title,postData.content);
    
    // this.http
    //   .post(
    //     'https://ng-guide-987d0.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPost().subscribe(posts=>{
      this.isFetching=false
      this.loadedPosts = posts;
    }, err => {
      this.isFetching = false;
      this.error = err.message;
    });
  }

  onHandleError(){
    this.error = null;
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }
}
