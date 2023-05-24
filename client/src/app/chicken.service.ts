import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Chicken } from './chicken';

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

  addChicken(chicken: Partial<Chicken>) {
    return this.http.post(environment.apiUrl, { ...chicken });
  }

  updateChicken(chicken: Chicken) {
    return this.http.put(`${environment.apiUrl}/${chicken.id}`, {
      ...chicken,
    });
  }

  deleteChicken(id: string) {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}
