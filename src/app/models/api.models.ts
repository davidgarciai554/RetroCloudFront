export interface VersionInfo {
  version: string;
}

export interface RoleInfo {
  rol: string;
}

export interface UserCreate {
  nombre: string;
  contraseña: string; // Asegúrate que 'contraseña' coincida con el backend
  rol_id: number;
}

export interface UserLogin {
  nombre: string;
  contraseña: string; // Asegúrate que 'contraseña' coincida con el backend
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface CreateUserResponse {
  msg: string;
}

export interface UserRoleInfo {
  id: number;
  nombre: string;
}

export interface Empresa {
  empresa_id: string;
  empresa_nombre: string; // Añadido punto y coma
}

export interface Consola {
  consola_id: number;
  consola_nombre?: string;
  nombre?: string; // Campo alternativo del backend
  empresa_nombre?: string;
  empresa_id?: number; // Opcional
}

export interface Juego {
  id: number;
  nombre: string;
  fecha_lanzamiento: string;
}

export interface Juego {
  juego_id: number;
  nombre: string;
  route: string;
}