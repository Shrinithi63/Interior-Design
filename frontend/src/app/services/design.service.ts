import { Injectable } from '@angular/core';
import { Design } from '../shared/models/design';
import { sample_designs, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
@Injectable({
  providedIn: 'root',
})
export class DesignService {
  constructor() {}
  getAll(): Design[] {
    return sample_designs;
  }

  getAllDesignsBySearchTerm(searchTerm: string) {
    return this.getAll().filter((design) =>
      design.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getDesignById(designId: string): Design {
    return (
      this.getAll().find((design) => design.id == designId) ?? new Design()
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllDesignsByTag(tag: string): Design[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((design) => design.tags?.includes(tag));
  }
}
