import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chicken } from './chicken';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChickenService {
  constructor(private http: HttpClient) {}

  getChickens() {
    return this.http.get<Chicken[]>(environment.apiUrl);
  }

  getChicken(id: string) {
    return this.http.get<Chicken>(`${environment.apiUrl}/${id}`);
  }

  addChicken(chicken: Partial<Chicken>): Observable<Chicken> {
    return this.http.post<Chicken>(environment.apiUrl, { ...chicken });
  }

  addImage(id: string, image: File) {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<string>(
      `${environment.apiUrl}/image/${id}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  updateChicken(chicken: Chicken) {
    return this.http.put(`${environment.apiUrl}/${chicken.id}`, chicken);
  }

  deleteChicken(id: string) {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}
