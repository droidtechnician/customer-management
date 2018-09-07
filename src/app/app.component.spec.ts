import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { GlobalService } from './services/global.service';
import { SharedModule } from './modules/shared-module/shared.module';
import { CoreModule } from './modules/core-module/core.module';
import { ToasterEnum } from './utilities/enums/toaster.enums';
import { Subject } from 'rxjs/Subject';
import { ToasterModel } from './utilities/models/toast.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  
  let app: AppComponent,
  fixture: ComponentFixture<AppComponent>,
  globalService: GlobalService,
  originalTimeOut: number;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers:[]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    globalService = TestBed.get(GlobalService);
    originalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  }));

  afterAll(()=> {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeOut;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
});
