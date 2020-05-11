import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

interface NoMessage {
  id: string;
  text: string;
  file: string;
}

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoundsComponent {
  semaphore = false;

  data: NoMessage[] = [
    {
      id: '1',
      text: ':)',
      file: 'nein.m4a',
    },
    {
      id: '2',
      text: ':(',
      file: 'aehm.nee.m4a',
    },
    {
      id: '3',
      text: '=)',
      file: 'noe.m4a',
    },
    {
      id: '4',
      text: ':P',
      file: 'scheisse.m4a',
    },
    {
      id: '5',
      text: '=(',
      file: 'lachen.m4a',
    },
    {
      id: '6',
      text: ';)',
      file: 'nachdenken.m4a',
    },
    {
      id: '7',
      text: '8)',
      file: 'frage.m4a',
    },
    {
      id: '8',
      text: '8(',
      file: 'richtig.m4a',
    },
    {
      id: '9',
      text: '8P',
      file: 'urlaub.m4a',
    },
  ];

  constructor(
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
  }

  async sayNo(message: NoMessage): Promise<void> {
    if (this.semaphore) {
      return;
    }

    this.semaphore = true;
    const audio = new Audio(`./assets/sounds/${message.file}`);
    audio.addEventListener('ended', () => {
      this.semaphore = false;
      this.changeDetectionRef.detectChanges();
    });
    await audio.play();
  }
}
