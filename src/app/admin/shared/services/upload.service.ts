import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = `${environment.BASE_BACKEND_URL}/v1/upload`;

  constructor(
    private api: HttpClient
  ) { }

  uploadFile(file: FormData): Observable<string> {
    return (this.api.post(this.url, file, { responseType: 'text' }) as Observable<string>);
  }
}
