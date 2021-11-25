export class UnauthenticatedException extends Error {
  public constructor() {
    super('User is not authenticated');
  }
}
