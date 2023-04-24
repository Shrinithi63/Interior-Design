import { Component } from '@angular/core';
import { Design } from 'src/app/shared/models/design';
import { DesignService } from '../../../services/design.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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
    let designsObservable: Observable<Design[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        designsObservable = this.DesignService.getAllDesignsBySearchTerm(
          params.searchTerm
        );
      else if (params.tag)
        designsObservable = this.DesignService.getAllDesignsByTag(params.tag);
      else designsObservable = DesignService.getAll();

      designsObservable.subscribe((serverDesigns) => {
        this.designs = serverDesigns;
      });
    });
  }
}
