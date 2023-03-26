import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css'],
})
export class VideoUploaderComponent {
  progress: number = 0;
  message: string = '';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(public videosService: VideosService) {}

  uploadFiles(event: any) {
    if (event.target.files.length === 0) {
      return;
    }
    this.progress = 0;
    let filesToUpload = <File[]>event.target.files;
    const formData = new FormData();
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });
    this.videosService.uploadVideoFiles(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total && event.total > 0) {
            this.progress = Math.round((100 * event.loaded) / event!.total);
            if (this.progress === 100) {
              this.videosService.videoUploaded.next();
            }
          }
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }
}
