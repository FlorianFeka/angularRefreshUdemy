import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@Angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.data.subscribe((data:Data) => {
      this.server = data['server'];
    });

    // const serverId:number = 0;
    // this.route.params.subscribe((params:Params)=>{
    //   serverId = Number(params['id']);
    //   this.server = this.serversService.getServer(serverId);
    // });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

}
