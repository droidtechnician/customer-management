import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GlobalService } from './services/global.service';
import { ToasterEnum } from './utilities/enums/toaster.enums';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private globalService: GlobalService, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.showToasterMsg();
  }

  /**
   * show toaster msgs
   * @method showToasterMsg
   * @param none
   * @returns { void }
   */
  showToasterMsg(): void {
    this.globalService.getToast().subscribe(msg => {
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
