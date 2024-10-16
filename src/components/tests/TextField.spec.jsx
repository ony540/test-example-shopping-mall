import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className={'my-class'} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug();

  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });

  it('기본 placeholder가 "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props에 따라 placeholder가 변경된다.', async () => {
    const placeholder = '상품명을 입력해주세요.';
    await render(<TextField placeholder={placeholder} />);

    const textInput = screen.getByPlaceholderText(placeholder);
    expect(textInput).toBeInTheDocument();
  });

  // ----2.4강
  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn(); //스파이함수
    // 테스트코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지, 어떤 값을 반환하는지 등 다양한 값들을 저장

    const { user } = await render(<TextField onChange={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test');

    expect(spy).toHaveBeenCalledWith('test');
    //test 라는 텍스트를 반환하며 spy함수가 실행했는지 확인
  });

  it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onChange={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.type(textInput, 'test{Enter}'); //{}안에 키이름을 넣으면 해당 키보드가 눌러짐
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // 포커스 활성화
    // 탭 키로 인풋 요소로 포커스 이동
    // 인풋 요소를 클릭했을 때
    // textInput.focus()로 직접 발생

    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);
    // click과 연관 -> 포커스, 마우스업, 마우스 다운 등

    expect(spy).toHaveBeenCalled();
  });

  it('포커스가 활성화되면 border스타일이 추가된다.', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: '2px',
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
