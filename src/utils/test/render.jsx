import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// render 전에 userEvent를 셋업
// click등등을 할 수 있는 이벤트
export default async component => {
  const user = userEvent.setup();

  return {
    user,
    ...render(component),
  };
};
