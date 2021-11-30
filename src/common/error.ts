export class UnauthenticatedException extends Error {
  public constructor() {
    super('User is not authenticated');
  }
}

export class PreventRoutingException extends Error {
  public constructor() {
    super('Navigation successfully aborted. Please ignore this error.');
  }
}
