import { Pipe, type PipeTransform } from '@angular/core';
import { Thought } from '../../interfaces/interfaces';

@Pipe({
  name: 'appCheckIcon',
  standalone: true,
})
export class CheckIconPipe implements PipeTransform {

  transform(value: { thought: Thought, uid: string}): string {

    const { thought, uid } = value

		const element = thought.likedBy.indexOf(uid, 0)

		if (element > -1) {
      return 'thumb_down';
		} else {
      return 'thumb_up';
		}
  }

}
