import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoDialogData } from '../models/video-dialog-data';
import { VideosService } from '../services/videos.service';

@Component({
  selector: 'app-media-player',
  templateUrl: 'media-player.component.html',
  styleUrls: ['./media-player.component.css'],
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    public dialogRef: MatDialogRef<MediaPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VideoDialogData,
    private videosService: VideosService
  ) {}

  ngOnInit(): void {
    this.videosService.loadVideoClip(this.data.videoName).subscribe({
      next: (blob) => {
        const blobUrl = URL.createObjectURL(blob);
        this.videoPlayer.nativeElement.src = blobUrl;
        // this.videoPlayer.nativeElement.width = 400;
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
