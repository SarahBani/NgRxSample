import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { ModalService } from "../services/modal-service";
import * as fromApp from '../store/app.reducer';
import { selectIsLoading, selectError } from "../store/dance.selector";

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {

  private errorSubscription: Subscription;
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private modalService: ModalService,
    protected store: Store<fromApp.AppState>) {
    this.errorSubscription = this.store.select(selectError).subscribe(response => {
      if (!!response) {
        this.modalService.showError(response.message);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.errorSubscription != null) {
      this.errorSubscription.unsubscribe();
    }
  }

}
