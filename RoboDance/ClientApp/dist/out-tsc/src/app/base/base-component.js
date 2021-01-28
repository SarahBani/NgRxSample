var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { ModalService } from "../services/modal-service";
var BaseComponent = /** @class */ (function () {
    function BaseComponent(modalService) {
        this.modalService = modalService;
        this.isLoading = false;
        this.errorMessage = "An error has occured!";
        this.counter = 0;
    }
    BaseComponent.prototype.showLoader = function () {
        this.isLoading = true;
        this.counter++;
    };
    BaseComponent.prototype.hideLoader = function () {
        if (this.counter > 0) {
            this.counter--;
        }
        if (this.counter == 0) {
            this.isLoading = false;
        }
    };
    BaseComponent.prototype.showError = function (error) {
        if (error === void 0) { error = null; }
        console.warn('BaseLoadingComponent - showError');
        if (error != null) {
            var JsonErr = JSON.stringify(error);
            console.error(JsonErr);
        }
        this.modalService.showError(error !== null && error !== void 0 ? error : this.errorMessage);
        this.hideLoader();
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        if (this.changeLoaderStatusSubscription != null) {
            this.changeLoaderStatusSubscription.unsubscribe();
        }
    };
    BaseComponent = __decorate([
        Component({
            template: ''
        }),
        __metadata("design:paramtypes", [ModalService])
    ], BaseComponent);
    return BaseComponent;
}());
export { BaseComponent };
//# sourceMappingURL=base-component.js.map