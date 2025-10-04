import { Component, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RandomCountriesWidget } from '../../components/random-countries-widget/random-countries-widget';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, NgFor, FormsModule, RandomCountriesWidget],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class Home {
  countries = signal<any[]>([]);
  searchTerm = signal('');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  goToCountry(country: { countryCode: string; name: string }) {
    this.router.navigate(['/country', country.countryCode, country.name]);
  }

  fetchCountries() {
    this.http.get<any[]>(environment.availableCountriesUrl).subscribe({
      next: (data) => {
        const term = this.searchTerm();
        if (term) {
          const filtered = data.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()));
          this.countries.set(filtered);
        } else {
          this.countries.set(data);
        }
      },
      error: (err) => console.error(err),
    });
  }
}
