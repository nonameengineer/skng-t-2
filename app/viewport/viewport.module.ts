import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IfViewportSizeDirective} from './directives/if-viewport-size/if-viewport-size.directive';
import {ViewportSizeService} from './services/viewport-size/viewport-size.service';
import {IConfig} from './models/config.interface';
import {ViewportConfigService} from './services/viewport-config/viewport-config.service';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [
    CommonModule
  ],
  providers: [
    ViewportSizeService
  ],
  exports: [IfViewportSizeDirective]
})
export class ViewportModule {

  static forRoot(config: IConfig): ModuleWithProviders<ViewportModule> {
    return {
      ngModule: ViewportModule,
      providers: [
        { provide: ViewportConfigService, useValue: config },
      ]
    };
  }
}
