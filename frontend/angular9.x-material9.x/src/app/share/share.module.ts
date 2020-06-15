import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateModule } from '@ngx-translate/core';
import { translateModuleConfig } from '../i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      enableSourceMaps: !environment.production,
      disableConsoleLogging: environment.production,
    }),
    TranslateModule.forRoot(translateModuleConfig),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    LoggerModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class ShareModule {}
