import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
    error = new Subject<string>();
    
    constructor(private http: HttpClient) {}

    createAndStorePost(title:string, content:string){
        console.log("called");
        
        const postData: Post = {title:title,content:content};
        this.http.post<{name:string}>(
            'https://ng-guide-987d0.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response'
            }
            )
            .subscribe(responseData => {
          console.log(responseData);
          
        }, error => {
            this.error.next(error.message)
        });
    }

    fetchPost() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        searchParams = searchParams.append('custom','key');
        return this.http
        .get<{[key: string]:Post}>("https://ng-guide-987d0.firebaseio.com/posts.json",
        {
            headers: new HttpHeaders({'Custom-Header':'Hello'}),
            params: searchParams
        })
        .pipe(
          map((responseData)=>{
          const postArray:Post[] = [];
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key});
            }
          }
          return postArray;
        }),
            catchError(errorRes => {
                return throwError(errorRes);
            })
        );
    }

    deletePosts(){
        return this.http.delete("https://ng-guide-987d0.firebaseio.com/posts.json",
        {
            observe: 'events',
            responseType: 'text'
        }
        ).pipe(tap((event) => {
            console.log(event);
            
            if(event.type === HttpEventType.Sent){
                
                
            }
            if(event.type === HttpEventType.Response){
                console.log(event.body);
                
            }
        }));
    }
}