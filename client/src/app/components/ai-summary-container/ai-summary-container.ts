import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-summary-container',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ai-summary-container.html',
  styleUrl: './ai-summary-container.scss',
})
export class AiSummaryContainer {
  reportText = '';
  summary = 'waiting...';
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }
  generateSummary() {
    this.loading = true;
    this.error = '';

    this.http.post<any>('http://localhost:3000/summary', {
      reportText: this.reportText
    }).subscribe({
      next: (res) => {
        this.summary = res.summary;
        console.log(res.summary)
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to generate summary';
        this.loading = false;
      }
    });
  }
}
