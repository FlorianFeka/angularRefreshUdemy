import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@Angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute) { }

  onReload() {
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

}
