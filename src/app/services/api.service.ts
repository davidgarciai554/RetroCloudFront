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
} from '../models/api.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ========== AUTH ENDPOINTS ==========
  
  // Endpoint: POST /auth/register - Registro de usuarios
  register(user: UserCreate): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.baseUrl}/auth/register`, user);
  }

  // Endpoint: POST /auth/login - Login
  login(user: UserLogin): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/auth/login`, user);
  }

  // Endpoint: GET /auth/roles - Listar roles
  getRoles(): Observable<RoleInfo[]> {
    return this.http.get<RoleInfo[]>(`${this.baseUrl}/auth/roles`);
  }

  // ========== USUARIOS ENDPOINTS ==========
  
  // Endpoint: GET /usuarios/rol/{rol} - Usuarios por rol
  getUsuariosPorRol(rol: string): Observable<UserRoleInfo[]> {
    return this.http.get<UserRoleInfo[]>(`${this.baseUrl}/usuarios/rol/${rol}`);
  }

  // ========== EMPRESAS ENDPOINTS ==========
  
  // Endpoint: GET /empresas/ - Empresas con juegos
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/empresas/`);
  }

  // ========== CONSOLAS ENDPOINTS ==========
  
  // Endpoint: GET /consolas/empresa/{empresa_id} - Consolas por empresa
  getConsolasPorEmpresa(empresaId: number): Observable<Consola[]> {
    return this.http.get<Consola[]>(`${this.baseUrl}/consolas/empresa/${empresaId}`);
  }

  // Endpoint: GET /consolas/ - Todas las consolas
  getAllConsolas(): Observable<Consola[]> {
    return this.http.get<Consola[]>(`${this.baseUrl}/consolas/`);
  }

  // ========== JUEGOS ENDPOINTS ==========
  
  // Endpoint: GET /juegos/consola/{consola_id} - Juegos por consola
  getJuegosPorConsola(consolaId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.baseUrl}/juegos/consola/${consolaId}`);
  }

  // Endpoint: POST /juegos/registrar - Registrar juego
  registrarJuego(juegoData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/juegos/registrar`, juegoData);
  }

  // ========== LEGACY ENDPOINTS (DEPRECATED) ==========
  // Mantener temporalmente para compatibilidad
  
  // @deprecated Use getRoles() instead
  getVersion(): Observable<VersionInfo> {
    return this.http.get<VersionInfo>(`${this.baseUrl}/getVersion`);
  }

  // @deprecated Use register() instead
  createUser(user: UserCreate): Observable<CreateUserResponse> {
    return this.register(user);
  }

  // @deprecated Use getJuegosPorConsola() instead
  getJuegos(empresaId: number, consolaId: number): Observable<Juego[]> {
    let params = new HttpParams()
      .set('empresa_id', empresaId.toString())
      .set('consola_id', consolaId.toString());
    return this.http.get<Juego[]>(`${this.baseUrl}/juegos`, { params });
  }
}