import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminDTO {
  id: number;
  nom: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admins';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<AdminDTO[]> {
    return this.http.get<AdminDTO[]>(`${this.baseUrl}`);
  }

  getAdmin(id: number): Observable<AdminDTO> {
    return this.http.get<AdminDTO>(`${this.baseUrl}/${id}`);
  }

  createAdmin(admin: AdminDTO): Observable<AdminDTO> {
    return this.http.post<AdminDTO>(this.baseUrl, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
