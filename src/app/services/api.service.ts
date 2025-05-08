import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  VersionInfo,
  RoleInfo,
  UserCreate,
  UserLogin,
  Token,
  CreateUserResponse,
  UserRoleInfo,
  Empresa,
  Consola,
  Juego
} from '../models/api.models'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8001'; // ¡Ajusta si tu backend corre en otro puerto/URL!

  constructor(private http: HttpClient) { }

  // Endpoint: GET /getVersion
  getVersion(): Observable<VersionInfo> {
    return this.http.get<VersionInfo>(`${this.baseUrl}/getVersion`);
  }

  // Endpoint: GET /roles
  getRoles(): Observable<RoleInfo[]> {
    return this.http.get<RoleInfo[]>(`${this.baseUrl}/roles`);
  }

  // Endpoint: POST /createUser/
  createUser(user: UserCreate): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.baseUrl}/createUser/`, user);
  }

  // Endpoint: POST /login
  login(user: UserLogin): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/login`, user);
  }

  // Endpoint: GET /usuariosRol/{rol}
  getUsuariosPorRol(rol: string): Observable<UserRoleInfo[]> {
    return this.http.get<UserRoleInfo[]>(`${this.baseUrl}/usuariosRol/${rol}`);
  }

  // Endpoint: GET /empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresas`);
  }

  // Endpoint: GET /consolas/{empresa_id}
  getConsolasPorEmpresa(empresaId: number): Observable<Consola[]> {
    return this.http.get<Consola[]>(`${this.baseUrl}/consolas/${empresaId}`);
  }

  // Endpoint: GET /juegos
  getJuegos(empresaId: number, consolaId: number): Observable<Juego[]> {
    let params = new HttpParams()
      .set('empresa_id', empresaId.toString())
      .set('consola_id', consolaId.toString());
    return this.http.get<Juego[]>(`${this.baseUrl}/juegos`, { params });
  }
}