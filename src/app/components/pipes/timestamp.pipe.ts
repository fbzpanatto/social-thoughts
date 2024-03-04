import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTimestamp',
  standalone: true,
})
export class TimestampPipe implements PipeTransform {

  transform(seconds: number | undefined): string | null {

    if (!seconds) { return null }

    const date = new Date(seconds * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
