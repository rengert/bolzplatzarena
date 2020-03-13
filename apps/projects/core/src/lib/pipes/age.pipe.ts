import { Pipe, PipeTransform } from '@angular/core';
import moment, { MomentInput } from 'moment';

@Pipe({ name: 'age' })
export class AgePipe implements PipeTransform {
  transform(value: MomentInput): string {
    return moment()
      .diff(moment(value), 'years')
      .toString();
  }
}
