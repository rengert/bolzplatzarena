import { Component } from '@angular/core';

interface NoMessage {
  id: string;
  text: string;
  file: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  semaphore = false;

  data: NoMessage[] = [
    {
      id: '1',
      text: ':)',
      file: 'nein.doch',
    },
    {
      id: '2',
      text: ':(',
      file: 'nein.doch',
    },
    {
      id: '3',
      text: '=)',
      file: 'nein.doch',
    },
  ];

  async sayNo(message: NoMessage): Promise<void> {
    if (this.semaphore) {
      return;
    }

    this.semaphore = true;
    const audio = new Audio(`./assets/${message.file}.mp3`);
    audio.addEventListener('ended', () => {
      this.semaphore = false;
    });
    await audio.play();
  }
}
