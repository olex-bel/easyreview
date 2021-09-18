import { duration } from '@/utils/datetime'

describe('duration', () => {
  it('should return a year ago', () => {
    const text = duration({
      from: '2020-01-12T23:32:18.000Z',
      to: '2021-01-12T23:32:18.000Z',
    });

    expect(text).toBe('a year ago');
  });

  it('should return 2 years ago', () => {
    const text = duration({
      from: '2019-01-12T23:32:18.000Z',
      to: '2021-01-12T23:32:18.000Z',
    });

    expect(text).toBe('2 years ago');
  });

  it('should return 5 months ago', () => {
    const text = duration({
      from: '2021-01-12T23:32:18.000Z',
      to: '2021-06-12T23:32:18.000Z',
    });

    expect(text).toBe('5 months ago');
  });

  it('should return 25 days ago', () => {
    const text = duration({
      from: '2021-01-01T23:32:18.000Z',
      to: '2021-01-26T23:32:18.000Z',
    });

    expect(text).toBe('25 days ago');
  });

  it('should return an hour ago', () => {
    const text = duration({
      from: '2021-01-12T22:32:18.000Z',
      to: '2021-01-12T23:32:18.000Z',
    });

    expect(text).toBe('an hour ago');
  });

  it('should return 5 minutes ago', () => {
    const text = duration({
      from: '2021-01-12T23:30:18.000Z',
      to: '2021-01-12T23:35:18.000Z',
    });

    expect(text).toBe('5 minutes ago');
  });

  it('should return a moment ago', () => {
    const text = duration({
      from: '2021-01-12T23:35:01.000Z',
      to: '2021-01-12T23:35:59.000Z',
    });

    expect(text).toBe('a moment ago');
  });
});
