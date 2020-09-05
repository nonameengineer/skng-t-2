import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ViewportSizeService} from '../../services/viewport-size/viewport-size.service';
import {IConfig} from '../../models/config.interface';
import {Size} from '../../models/size.enum';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewportSizeService: ViewportSizeService) { }

  @Input() set ifViewportSize(condition: Size) {
    const CONFIG: IConfig = this.viewportSizeService.getViewportConfig();
    this.viewportSizeService.size$.subscribe(viewportWidth => {
      switch (condition) {
        case Size.SMALL: {
          this.checkConditions(viewportWidth < CONFIG.medium);
          break;
        }
        case Size.MEDIUM: {
          this.checkConditions(CONFIG.medium <= viewportWidth && viewportWidth < CONFIG.large);
          break;
        }
        case Size.LARGE: {
          this.checkConditions(CONFIG.large <= viewportWidth);
          break;
        }
      }
    });
  }

  showView(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  }

  hideView(): void {
    this.viewContainer.clear();
    this.hasView = false;
  }

  checkConditions(conditionExpr): void {
    if (conditionExpr && !this.hasView) {
      this.showView();
    } else if (!conditionExpr && this.hasView) {
      this.hideView();
    }
  }
}
