import { delay } from "@/utils/delay";

describe('delay', () => {
  it('should resolve Promise after specified time', async () => {
    const start = Date.now();
    await delay(2000);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(2000);
  });
});
