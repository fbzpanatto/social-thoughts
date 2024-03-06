import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appChangeIcon',
  standalone: true
})
export class ChangeIconPipe implements PipeTransform {

  transform(value: { index: number, div?: HTMLElement }): string {

    return value.index === parseInt(value.div?.id as string) ? 'close_fullscreen' : 'open_in_full'
  }
}
