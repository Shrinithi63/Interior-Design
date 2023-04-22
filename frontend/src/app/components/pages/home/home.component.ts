import { Component } from '@angular/core';
import { Design } from 'src/app/shared/models/design';
import { DesignService } from '../../../services/design.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  designs: Design[] = [];
  constructor(private DesignService: DesignService) {
    this.designs = DesignService.getAll();
  }
}
