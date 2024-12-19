import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// 스파이함수로  목킹하기
//useNavigate 훅으로 반환받은 navigate 함수가 올바루게 호출되었는가
const navigateFn = vi.fn();

//vi.mock ('목킹할 모듈의 이름')
vi.mock('react-router-dom', async () => {
  // 일부모듈만 목킹 나머지는 기본 그대로 사용하기 위한 코드 (vi.importActual)
  const original = await vi.importActual('react-router-dom');

  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  // 사용하자 해당 버튼을 클릭할 경우
  await user.click(screen.getByText('홈으로 가기'));

  // 해당 함수가 '/'경로로(인자로 받는지) 한번만 호출되는지 파악
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
