import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';
it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  const { result, rerender } = renderHook(useConfirmModal);
  // renderHook - 커스텀 리액트 훅을 컴포넌트가 아니라도 임포트 가능
  // result: 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  // rerender: 훅을 운하는 인자와 함께 새로 호출하여 상태를 갱신한다.

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);

  // 테스트 환경에서 컴포넌트 렌더링 결과를 jsdom(가상 돔)에 반영하기 위해 act함수를 반드시 호출해야함
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
});

it('rerender를 통해 initialValue를 바꾸면 새로운 값으로 isModalOpened 상태가 재설정된다.', () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useConfirmModal(initialValue),
    {
      initialProps: { initialValue: false },
    },
  );

  expect(result.current.isModalOpened).toBe(false);

  // rerender를 통해 initialValue 값을 true로 변경
  rerender({ initialValue: true });

  // 주의: 상태는 유지되므로, 초기값을 바꿔도 상태가 초기화되진 않음
  // 따라서 아래는 false를 기대해야 합니다
  expect(result.current.isModalOpened).toBe(false);
});
