import {InjectionToken} from '@angular/core';
import {IConfig} from '../../models/config.interface';

export const ViewportConfigService = new InjectionToken<IConfig>('ConfigService');
