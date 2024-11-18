import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UserDTO {
  id: number;
  nom: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';
  private userKey = 'authenticatedUser';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}`);
  }

  authenticateUser(emailOrNom: string): Observable<UserDTO | null> {
    return this.getUsers().pipe(
      map((users) => {
        const user = users.find(
          (user) =>
            (user.nom === emailOrNom || user.email === emailOrNom)
        );
        return user ?? null;
      })
    );
  }

  login(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Récupérer l'utilisateur connecté
  getAuthenticatedUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  // Déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  // Vérifie si un utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getAuthenticatedUser();
  }

  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/${id}`);
  }

  createUser(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.baseUrl, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
