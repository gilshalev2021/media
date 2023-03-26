import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoNameFormatter',
})
export class VideoNameFormatterPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('.jpg', '');
  }
}
