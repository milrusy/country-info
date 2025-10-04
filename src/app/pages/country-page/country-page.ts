import { Component, signal, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './country-page.html',
  styleUrls: ['./country-page.scss']
})
export class CountryPage implements OnInit {
  countryCode = '';
  countryName = '';
  holidays = signal<any[]>([]);
  selectedYear = signal<number>(new Date().getFullYear());
  years = Array.from({ length: 11 }, (_, i) => 2020 + i);

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.countryCode = params.get('code') || '';
      this.countryName = params.get('name') || '';
      this.fetchHolidays(this.selectedYear());
    });
  }

  fetchHolidays(year: number) {
    this.http.get<any[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${this.countryCode}`)
      .subscribe({
        next: data => this.holidays.set(data),
        error: err => this.holidays.set([])
      });
  }

  onYearSelect(year: number) {
    this.selectedYear.set(year);
    this.fetchHolidays(year);
  }
}
