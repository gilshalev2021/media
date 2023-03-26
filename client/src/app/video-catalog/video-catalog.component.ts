import { Component, OnInit } from '@angular/core';
import { VideosService } from '../services/videos.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  MatDialog,
  // MAT_DIALOG_DATA,
  // MatDialogRef,
} from '@angular/material/dialog';
import { MediaPlayerComponent } from '../media-player/media-player.component';

@Component({
  selector: 'app-video-catalog',
  templateUrl: './video-catalog.component.html',
  styleUrls: ['./video-catalog.component.css'],
})
export class VideoCatalogComponent implements OnInit {
  thumbnails: string[] = [];
  constructor(
    public videosService: VideosService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.videosService.videoUploaded.subscribe((value: any) => {
      setTimeout(() => this.getThumbnails(), 1000);
    });
  }

  ngOnInit() {
    this.getThumbnails();
  }

  getThumbnails() {
    this.videosService.getThumbnails().subscribe({
      next: (res) => (this.thumbnails = res as string[]),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  refreshVideos() {
    this.getThumbnails();
  }

  openDialog(videoName: string): void {
    const dialogRef = this.dialog.open(MediaPlayerComponent, {
      data: { videoName: videoName },
    });
  }

  launchMediaPlayerDialog(thumbnail: string) {
    let videoFile = thumbnail.replace('.jpg', '.mp4');
    this.openDialog(videoFile);
  }

  getThumbnailImgPath(imgPath: string) {
    return `https://localhost:5001/StaticFiles/Videos/${imgPath}`;
  }
}
