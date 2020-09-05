import {Inject, Injectable} from '@angular/core';
import {ViewportConfigService} from '../viewport-config/viewport-config.service';
import {IConfig} from '../../models/config.interface';
import {BehaviorSubject, fromEvent, interval} from 'rxjs';
import {debounce, distinctUntilChanged} from 'rxjs/operators';

@Injectable()
export class ViewportSizeService {
  private readonly config: IConfig;
  public size$ = new BehaviorSubject<number>(0);

  constructor(@Inject(ViewportConfigService) private viewportConfig) {
    this.config = viewportConfig;
    this.size$.next(this.getInitialViewportSize());

    fromEvent(window, 'resize').pipe(
      distinctUntilChanged(),
      debounce(() => interval(300)),
    ).subscribe( (event: any) => {
      const size = event.target.document.documentElement.clientWidth;
      this.size$.next(size);
    });
  }

  getViewportConfig(): IConfig {
    return this.config;
  }

  getInitialViewportSize(): number {
    return document.documentElement.clientWidth;
  }
}
