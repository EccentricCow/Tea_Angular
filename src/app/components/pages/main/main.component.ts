import {Component, OnDestroy, OnInit} from '@angular/core';
import 'jquery-ui/ui/widgets/accordion';
import {Subscription} from "rxjs";
import {MainModalService} from "../../../services/main-modal.service";

declare var bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private modalOnMainPageSubscription: Subscription | null = null;

  private mainModal: any;

  constructor(private mainModalService: MainModalService) {
  }

  ngOnInit(): void {
    ($("#accordion") as any).accordion({
      active: true,
      heightStyle: 'content',
      collapsible: true,
    });

    if (!this.mainModalService.isModalShown) {
      this.mainModalService.clearModalTimer();
      this.mainModal = new bootstrap.Modal('#modal');
      this.modalOnMainPageSubscription = this.mainModalService.startModalTimer().subscribe(() => {
          this.mainModal.show();
          this.mainModalService.isModalShown = true;
        }
      );
    }
  }

  ngOnDestroy() {
    this.modalOnMainPageSubscription?.unsubscribe();
  }
}
