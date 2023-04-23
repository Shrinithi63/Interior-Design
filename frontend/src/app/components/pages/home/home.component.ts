import { Component } from '@angular/core';
import { Design } from 'src/app/shared/models/design';
import { DesignService } from '../../../services/design.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  designs: Design[] = [];
  constructor(
    private DesignService: DesignService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        this.designs = this.DesignService.getAllDesignsBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        this.designs = this.DesignService.getAllDesignsByTag(params.tag);
      else {
        this.designs = DesignService.getAll();
      }
    });
  }
}
