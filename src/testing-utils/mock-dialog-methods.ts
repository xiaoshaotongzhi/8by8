/**
 * Mocks HTMLDialogElement methods as they are not supported by our test framework at this time.
 */
export function mockDialogMethods() {
  HTMLDialogElement.prototype.showModal = () => {};
  HTMLDialogElement.prototype.close = () => {};
}
