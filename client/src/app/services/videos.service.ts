import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private baseUrl = 'https://localhost:5001/api/mediaFiles';

  public videoUploaded: Subject<void> = new Subject();

  constructor(private http: HttpClient) {}

  loadVideoClip(videoName: string) {
    return this.http.get(`${this.baseUrl}/${videoName}`, {
      responseType: 'blob',
    });
  }

  uploadVideoFiles(formData: FormData) {
    return this.http.post(this.baseUrl, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getThumbnails = () => {
    return this.http.get(this.baseUrl);
  };
}
