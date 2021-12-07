export class PreventRoutingException extends Error {
  public constructor() {
    super('Navigation successfully aborted due to unsaved changes. Please ignore this error: https://github.com/vercel/next.js/issues/2476');
  }
}
