import { Component, OnInit } from '@angular/core';
import { Router } from '@Angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onLoadServers() {
    // theoretically some stuff to do before this
    this.router.navigate(['/servers']);
  }

}
