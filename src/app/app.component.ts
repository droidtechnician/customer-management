import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { GlobalService } from './services/global.service';
import { ToasterEnum } from './utilities/enums/toaster.enums';
import { ToastsManager } from 'ng6-toastr';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner = false;

  unSubAllService: Subject<boolean> = new Subject<boolean>();

  constructor(private globalService: GlobalService, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.showToasterMsg();
    this.setUpSpinner();
  }

  ngOnDestroy() {
    this.unSubAllService.next(true);
    this.unSubAllService.unsubscribe();
  }

  /**
   * show/hide spinner 
   * @method setUpSpinner
   * @returns {void} nothing is returned
   */
  setUpSpinner(): void {
    this.globalService.getSpinner()
      .pipe(
        takeUntil(this.unSubAllService)
      )
      .subscribe((value: boolean) => {
        setTimeout(() => {
          this.showSpinner = value;
        })
      })
  }

  /**
   * show toaster msgs
   * @method showToasterMsg
   * @param none
   * @returns { void }
   */
  showToasterMsg(): void {
    this.globalService.getToast()
    .pipe(
      takeUntil(this.unSubAllService)
    )
    .subscribe(msg => {
      switch (msg.type) {
        case ToasterEnum.SUCCESS:
          this.toastr.success(msg.msg, 'Success');
          break;
        case ToasterEnum.ERROR:
          this.toastr.error(msg.msg, 'Error');
          break;
        case ToasterEnum.INFORMATION:
          this.toastr.info(msg.msg, 'Information');
      }
    });
  }
}
