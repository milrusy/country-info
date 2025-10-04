import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Country } from '../../types/country';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-random-countries-widget',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './random-countries-widget.html',
  styleUrls: ['./random-countries-widget.scss'],
})
export class RandomCountriesWidget implements OnInit {
  countries = signal<{ countryCode: string; name: string; nextHoliday?: any }[]>([]);
  selectedCountry = signal<Country | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchRandomCountries();
  }

  goToCountry(country: { countryCode: string; name: string }) {
    this.router.navigate(['/country', country.countryCode, country.name]);
  }

  fetchRandomCountries() {
    this.http.get<any[]>(environment.availableCountriesUrl).subscribe({
      next: (data) => {
        const randomCountries = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        const holidayRequests = randomCountries.map((country) =>
          this.http.get<any[]>(`${environment.nextPublicHolidaysUrl}${country.countryCode}`),
        );

        forkJoin(holidayRequests).subscribe({
          next: (holidaysArr) => {
            const countriesWithHolidays = randomCountries.map((country, i) => ({
              ...country,
              nextHoliday: holidaysArr[i]?.[0] || null,
            }));
            this.countries.set(countriesWithHolidays);
          },
          error: (err) => console.error(err),
        });
      },
      error: (err) => console.error(err),
    });
  }
}
