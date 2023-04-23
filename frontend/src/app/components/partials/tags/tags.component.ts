import { Component, OnInit } from '@angular/core';
import { DesignService } from 'src/app/services/design.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  constructor(designService: DesignService) {}

  ngOnInit(): void {}
}
