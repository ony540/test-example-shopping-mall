import { screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '@/pages/error/components/NotFoundPage';
import render from '@/utils/test/render';

// 목킹하기
const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = await render(<NotFoundPage />);

  const button = await screen.getByRole('button', { name: 'Home으로 이동' });

  await user.click(button);

  // toHaveBeenNthCalledWith - 1번 해당함수에  '/', { replace: true } 이 두 인자가 전달되었는지
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: true });
});
