import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.http.get(this.url).subscribe((response) => {
      this.posts = response;
    });
  }
  url = 'https://jsonplaceholder.typicode.com/posts';
  posts: any;
  myForm = this.fb.group({
    userId: [''],
    title: [''],
    body: [''],
  });
  createPost(obj: any) {
    this.http.post(this.url, obj).subscribe((res) => {
      // set obj at first element of array
      this.posts.splice(0, 0, obj);
      console.warn('Your data is successfully send to server');
    });
    // reset myForm value
    this.myForm.reset();
  }
  ngOnInit(): void {}
}
