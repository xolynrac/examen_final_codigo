import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class ClienteName {
  private readonly clienteName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(clienteName: string) {
    this.clienteName = clienteName;
  }

  public getValue(): string {
    return this.clienteName;
  }

  public getClienteName(): string {
    return this.clienteName;
  }

  public static create(clienteName: string): Result<AppNotification, ClienteName> {
    let notification: AppNotification = new AppNotification();
    clienteName = (clienteName ?? "").trim();
    
    if (clienteName === "") {
      notification.addError('clienteName is required', null);
    }

    if (clienteName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an clienteName is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ClienteName(clienteName));
  }
}