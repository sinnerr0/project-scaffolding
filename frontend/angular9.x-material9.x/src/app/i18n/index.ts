import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { en } from './en';
import { ko } from './ko';

const language = { en, ko };

class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    localStorage.setItem('lang', lang);
    return of(language[lang]);
  }
}

const lang = localStorage.getItem('lang') || 'en';

export const translateModuleConfig = {
  loader: { provide: TranslateLoader, useClass: CustomTranslateLoader },
  useDefaultLang: true,
  defaultLanguage: lang,
};
