import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  transform(value: any[]): string {
    return value.join(' ');
  }
}
