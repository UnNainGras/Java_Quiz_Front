import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private adminKey = 'authenticatedAdmin';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<AdminDTO[]> {
    return this.http.get<AdminDTO[]>(`${this.baseUrl}`);
  }

  authenticateAdmin(emailOrNom: string): Observable<AdminDTO | null> {
    return this.getAdmins().pipe(
      map((admins) => {
        const admin = admins.find(
          (admin) =>
            (admin.nom === emailOrNom || admin.email === emailOrNom)
        );
        return admin ?? null;
      })
    );
  }

  login(admin: any): void {
    localStorage.setItem(this.adminKey, JSON.stringify(admin));
  }

  getAuthenticatedAdmin(): any {
    const admin = localStorage.getItem(this.adminKey);
    return admin ? JSON.parse(admin) : null;
  }

  logout(): void {
    localStorage.removeItem(this.adminKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthenticatedAdmin();
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
