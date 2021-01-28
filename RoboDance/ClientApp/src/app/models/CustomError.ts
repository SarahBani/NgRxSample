import { CustomException } from "./Enums";
import * as Constants from './Constants';

export class CustomError extends Error {

  message: string;

  constructor(exception: CustomException = CustomException.UnKnown) {
    super();
    (<any>Object).setPrototypeOf(this, new.target.prototype); // because of a but in Error or Array child class
    this.message = this.getMessage(exception);
  }

  private getMessage(exception: CustomException): string {
    switch (exception) {
      case CustomException.APIConnectionProblem:
        return Constants.Error_APIConnectionProblem;
      case CustomException.NoAvailableRobot:
        return Constants.Error_NoAvailableRobot;
      case CustomException.InvalidTeamsMembers:
        return Constants.Error_InvalidTeamsMembers;
      case CustomException.UnKnown:
      default:
        return Constants.Error_UnKnown;
    }
  }

}
