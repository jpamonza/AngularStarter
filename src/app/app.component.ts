import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('yesButton') yesButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('noButton') noButton!: ElementRef<HTMLButtonElement>;
  title = 'AngularStarter';

  headerMessage = '¿Quieres ser mi San Valentín?';

  noMessages = [
    'No',
    'Creo que te equivocaste de botón',
    'El botón verde está del otro lado',
    'Lo haré un poco más grande esta vez',
    'Me estás retando?',
  ];

  noMoreMessages = false;
  finished = false;

  idx = 1;
  currentImage = `/assets/question-${this.idx}.gif`;

  ngOnInit(): void {
    this.finished = Boolean(
      localStorage.getItem('valentinesDay.finished') ?? false
    );
    if (this.finished) {
      this.currentImage = '/assets/end.gif';
      this.headerMessage = 'Ya dijiste que sí, no puedes retractarte!';
    }
  }

  noButtonPressed(): void {
    this.idx++;
    if (this.idx === 5) {
      const noButtonHeight = `${this.noButton.nativeElement.clientHeight}px`;
      this.yesButton.nativeElement.style.height = `${
        this.yesButton.nativeElement.clientHeight + 30
      }px`;
      this.yesButton.nativeElement.style.fontSize = '40px';
      this.noButton.nativeElement.style.height = noButtonHeight;
    }
    if (this.idx > 5) {
      this.idx = 1;
      this.noMoreMessages = true;
    }
    this.currentImage = `/assets/question-${this.idx}.gif`;
  }

  yesButtonPressed(): void {
    this.currentImage = '/assets/end.gif';
    this.finished = true;
    this.headerMessage = 'Sabía que querías!';
    localStorage.setItem('valentinesDay.finished', `${this.finished}`);
  }
}
