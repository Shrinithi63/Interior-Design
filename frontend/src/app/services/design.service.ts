import { Injectable } from '@angular/core';
import { Design } from '../shared/models/design';
import { sample_designs } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
  constructor() {}
  getAll(): Design[] {
    return sample_designs;
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((design) =>
      design.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
