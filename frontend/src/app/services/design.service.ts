import { Injectable } from '@angular/core';
import { Design } from '../shared/models/design';
import { sample_designs, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DESIGNS_BY_ID_URL,
  DESIGNS_BY_SEARCH_URL,
  DESIGNS_BY_TAG_URL,
  DESIGNS_TAGS_URL,
  DESIGNS_URL,
} from '../shared/constants/urls';
@Injectable({
  providedIn: 'root',
})
export class DesignService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Design[]> {
    return this.http.get<Design[]>(DESIGNS_URL);
  }

  getAllDesignsBySearchTerm(searchTerm: string) {
    return this.http.get<Design[]>(DESIGNS_BY_SEARCH_URL + searchTerm);
  }

  getDesignById(designId: string): Observable<Design> {
    return this.http.get<Design>(DESIGNS_BY_ID_URL + designId);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(DESIGNS_TAGS_URL);
  }

  getAllDesignsByTag(tag: string): Observable<Design[]> {
    return tag === 'All'
      ? this.getAll()
      : this.http.get<Design[]>(DESIGNS_BY_TAG_URL + tag);
  }
}
