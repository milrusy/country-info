import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const content = `export const environment = {
  availableCountriesUrl: '${process.env['AVAILABLE_COUNTRIES_URL']}',
  nextPublicHolidaysUrl: '${process.env['NEXT_PUBLIC_HOLIDAYS_URL']}',
  publicHolidaysByYearUrl: '${process.env['PUBLIC_HOLIDAYS_BY_YEAR_URL']}'
};`;

fs.writeFileSync('src/environments/environment.ts', content);
