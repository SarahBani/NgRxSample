var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { ModalService } from './modal-service';
var ExceptionHandlerService = /** @class */ (function () {
    function ExceptionHandlerService(modalService) {
        this.modalService = modalService;
    }
    ExceptionHandlerService.prototype.showModalException = function (response) {
        this.modalService.showError(this.getExceptionMessage(response));
    };
    ExceptionHandlerService.prototype.getExceptionMessage = function (response) {
        if (response.error == null) {
            return response.message;
        }
        if (response.error.isSuccessful != null && !response.error.isSuccessful) {
            var exceptionMessage = response.error.customExceptionMessage;
            return exceptionMessage;
        }
        if (response.error.errors != null && Object.keys(response.error.errors).length > 0) {
            var values = Object.keys(response.error.errors).map(function (key) { return response.error.errors[key]; });
            var errorMessage = values.join('<br />');
            if (values.length > 1) {
                errorMessage = '<br />' + errorMessage;
            }
            return errorMessage;
        }
        console.log(response);
        return response.message;
    };
    ExceptionHandlerService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [ModalService])
    ], ExceptionHandlerService);
    return ExceptionHandlerService;
}());
export { ExceptionHandlerService };
//# sourceMappingURL=exception-handler-service.js.map