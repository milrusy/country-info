# CountryInfo

# Overview

The application is an Angular (v20+) standalone component-based project. Its main features include:

Home Page: Search and filter countries, view random countries with their next public holidays.

Country Page: Display a list of holidays for a selected country, with year switching support.

Routing: Uses Angular Router with standalone routes to navigate between Home and Country pages.

Environment Variables: API URLs are stored in a .env file and injected at build time.

# Architecture

Components:

Home – main landing page with search and random countries widget.

RandomCountriesWidget – reusable component displaying random countries and next holidays.

CountryPage – displays holidays for the selected country with year navigation.

# Additional Libraries / Frameworks Used

Angular 20+ – frontend framework.

HttpClientModule – API requests.

Prettier / ESLint – code formatting and linting.

dotenv / ts-node – environment variable injection at prebuild.

# API Documentation

All country and holiday data is fetched from the [Nager.Date.API](https://date.nager.at/swagger/index.html)

## .env variables

At the root of the project, create a file named .env.
Add the required variables:
# URL to fetch all available countries
AVAILABLE_COUNTRIES_URL=https://date.nager.at/api/v3/AvailableCountries

# URL to fetch next public holidays for a country
NEXT_PUBLIC_HOLIDAYS_URL=https://date.nager.at/api/v3/NextPublicHolidays/{countryCode}

# URL to fetch public holidays by year and country
PUBLIC_HOLIDAYS_BY_YEAR_URL=https://date.nager.at/api/v3/PublicHolidays/{year}/{countryCode}

The .env file is loaded automatically before the build.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.


## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

