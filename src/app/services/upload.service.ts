import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface GameUpload {
  title: string;
  description: string;
  consoleId: number;
  releaseDate?: string;
  publisher?: string;
  genre?: string;
  files: File[];
}

export interface UploadProgress {
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // API endpoints
  private readonly API_URL = `${environment.apiUrl}/api`;
  private readonly ENDPOINTS = {
    upload: `${this.API_URL}/games/upload`,
    validate: `${this.API_URL}/games/validate`
  };

  constructor(private http: HttpClient) {}

  // API Methods (commented out for now)
  /*
  uploadGame(gameData: GameUpload): Observable<UploadProgress> {
    const formData = new FormData();
    
    // Append game metadata
    formData.append('title', gameData.title);
    formData.append('description', gameData.description);
    formData.append('consoleId', gameData.consoleId.toString());
    if (gameData.releaseDate) formData.append('releaseDate', gameData.releaseDate);
    if (gameData.publisher) formData.append('publisher', gameData.publisher);
    if (gameData.genre) formData.append('genre', gameData.genre);

    // Append files
    gameData.files.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    return this.http.post(this.ENDPOINTS.upload, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => this.getUploadProgress(event)),
      catchError(error => of({
        progress: 0,
        status: 'error' as const,
        message: error.message
      }))
    );
  }

  validateFiles(files: File[]): Observable<{ valid: boolean; message?: string }> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file, file.name);
    });

    return this.http.post<{ valid: boolean; message?: string }>(
      this.ENDPOINTS.validate, 
      formData
    ).pipe(
      catchError(() => of({ valid: false, message: 'Validation failed' }))
    );
  }
  */

  // Mock implementation
  uploadGame(gameData: GameUpload): Observable<UploadProgress> {
    return new Observable(subscriber => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        
        if (progress <= 100) {
          subscriber.next({
            progress,
            status: progress === 100 ? 'completed' : 'uploading',
            message: progress === 100 ? 'Upload complete' : `Uploading... ${progress}%`
          });
        }

        if (progress === 100) {
          clearInterval(interval);
          subscriber.complete();
        }
      }, 500);
    });
  }

  validateFiles(files: File[]): Observable<{ valid: boolean; message?: string }> {
    // Mock validation - checks file types and sizes
    const validTypes = ['rom', 'iso', 'bin', 'zip', 'rar', '7z'];
    const maxSize = 1024 * 1024 * 1024; // 1GB

    const invalidFiles = files.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      return !validTypes.includes(extension) || file.size > maxSize;
    });

    return of({
      valid: invalidFiles.length === 0,
      message: invalidFiles.length > 0 
        ? `Invalid files found: ${invalidFiles.map(f => f.name).join(', ')}`
        : undefined
    });
  }

  private getUploadProgress(event: HttpEvent<any>): UploadProgress {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = Math.round((100 * event.loaded) / (event.total || 1));
        return {
          progress,
          status: 'uploading',
          message: `Uploading... ${progress}%`
        };
      
      case HttpEventType.Response:
        return {
          progress: 100,
          status: 'completed',
          message: 'Upload complete'
        };
      
      default:
        return {
          progress: 0,
          status: 'pending'
        };
    }
  }
}
