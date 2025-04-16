import { pick, debounce } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    //obj 함수에 'a'키값의 객체 pick
    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다(snapshots)', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toMatchInlineSnapshot(`
      {
        "a": "A",
      }
    `);
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    //obj 함수에 'a','b'키값의 객체 pick
    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

//테스트 코드는 비동기 타이머와 무관하게 동기적으로 실행
// -> 비동기 함수가 실행되기 전에 단언이 실행됨.
// 타이머 모킹!
describe('debounce', () => {
  // 1. setup에서 타이머 모킹
  beforeEach(() => {
    vi.useFakeTimers();

    // 테스트 당시 시간에 의존하는 테스트의 경우 시간을 고정하지않으면 깨질 수 있음
    // setSystemTime - 시간을 고정하면 일관된 환경에서 테스트 가능
    vi.setSystemTime(new Date('2023-12-15'));
  });

  // 3. teardown에서 모킹 초기화 -> 다른 테스트에 영향이 없어야함
  // 3rd파티 라이브러리, 전역의 teardown에서 타이머에 의존하는 로직 useFakeTimers로 인해 제대로 동작하지않을 수 있음
  afterEach(() => {
    vi.useRealTimers();
  });

  // 2. testing
  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    // 스파이 함수 생성
    const spy = vi.fn();

    const debouncedFn = debounce(spy, 300);

    debouncedFn();

    // 2. 0.3초 흐른 것으로 타이머 조작
    vi.advanceTimersByTime(300);

    //3. spy 함수 호출 확인
    expect(spy).toHaveBeenCalled();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();

    const debouncedFn = debounce(spy, 300);

    debouncedFn();

    vi.advanceTimersByTime(200);
    debouncedFn();

    vi.advanceTimersByTime(100);
    debouncedFn();

    vi.advanceTimersByTime(200);
    debouncedFn();

    // 최초 호출 후에 호출 간격이 0.3초이상 다섯번째 호출이 유일
    vi.advanceTimersByTime(300);
    debouncedFn();

    // -> 1번만 실행
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
