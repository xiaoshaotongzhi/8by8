export class NullContextError extends Error {
  public readonly name = 'NullContextError';
  public readonly message: string;

  public constructor(contextName: string, consumerName: string) {
    super();
    this.message = NullContextError.getMessage(contextName, consumerName);
  }

  private static getMessage(contextName: string, consumerName: string) {
    return `${consumerName} cannot read properties of null ${contextName}. ${consumerName} must be a child of ${contextName}.Provider.`;
  }
}
