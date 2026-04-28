import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AiSummaryContainer } from './components/ai-summary-container/ai-summary-container'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AiSummaryContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}
