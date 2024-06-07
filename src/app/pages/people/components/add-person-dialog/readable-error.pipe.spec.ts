import { ReadableErrorPipe } from './readable-error.pipe';

describe('ReadableErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ReadableErrorPipe();
    expect(pipe).toBeTruthy();
  });
});
