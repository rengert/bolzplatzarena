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
      file: 'nein.doch.mp3',
    },
    {
      id: '2',
      text: ':(',
      file: 'aehm.nee.m4a',
    },
    {
      id: '3',
      text: '=)',
      file: 'nein.doch',
    },
    {
      id: '1',
      text: ':P',
      file: 'nein.doch',
    },
    {
      id: '2',
      text: '=(',
      file: 'nein.doch',
    },
    {
      id: '3',
      text: ';)',
      file: 'nein.doch',
    },
    {
      id: '1',
      text: '8)',
      file: 'nein.doch',
    },
    {
      id: '2',
      text: '8(',
      file: 'nein.doch',
    },
    {
      id: '3',
      text: '8P',
      file: 'nein.doch',
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
