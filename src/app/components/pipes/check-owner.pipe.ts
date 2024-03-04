import { Pipe, type PipeTransform } from '@angular/core';
import { Thought } from '../../interfaces/interfaces';

@Pipe({
  name: 'appCheckOwner',
  standalone: true,
})
export class CheckOwnerPipe implements PipeTransform {

  transform(value: { uid: string, thought: Thought }): boolean {
    
    return !(value.thought.userUid === value.uid)
  }
}
