import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  results:Object;

  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
      // Make the HTTP request:
      this.http.get('http://localhost:3000/news').subscribe(data => {
        // Read the result field from the JSON response.
        this.results = data;
    });
  }
  onKeyUp(){
  }
}

