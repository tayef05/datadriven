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
  posts: any = [];
  myForm = this.fb.group({
    userId: [''],
    title: [''],
    body: [''],
  });
  delete_clicked = 0;
  createPost(obj: any) {
    this.http.post(this.url, obj).subscribe((res) => {
      // set obj at first element of array
      this.posts.splice(0, 0, obj);
      console.warn('Your data is successfully send to server');
    });
    // reset myForm value
    this.myForm.reset();
  }
  deletePost(id: number) {
    const new_urls = this.url + '/' + id;
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    };
    this.http.delete(new_urls, { headers }).subscribe((res) => {
      console.log('Successfully delete the object with id: ' + id);
      console.warn(res);

      id = id - this.delete_clicked - 1;
      this.posts.splice(id, 1);
      this.delete_clicked++;
      console.log(id);
    });
  }
  ngOnInit(): void {}
}
