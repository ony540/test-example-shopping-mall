import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

/**
 * 1.Arrange - 테스트를 위한 환경 만들기
 *  className을 지닌 컴포넌트 렌더링
 *
 * 2.Act - 테스트할 동작 발생
 * 렌더링에 대한 검증이므로 이 단계는 생략
 * 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
 *
 * 3.Assert - 올바른 동작이 실행되었는지 검증
 * 렌더링 후 DOM에 해당 class가 존재하는지 검증
 */

//---------------------------

// Setup

// beforeAll - 해당 스코프가 실행될 때 맨처음 1번만 실행됨
// beforeEach와 동위선상에 있다면 beforeAll이 먼저 실행됨
beforeAll(() => {
  console.log('root - beforeAll');
});

// beforeEach - 상위에 배치되어 있으면 모든 함수가 실행되기 전에 각각 실행된다.
beforeEach(() => {
  console.log('root - beforeEach');
});

// TearDown

// afterEach - 모든 함수가 끝나고 나서 각각 1번씩 실행
afterEach(() => {
  console.log('root - afterEach');
});
// afterAll - 스코프 내 가장 마지막 1번,  Each 보다 더 뒤에 실행
afterAll(() => {
  console.log('root - afterAll');
});

// my-class란 class가 적용된 컴포넌트를 항상 렌더링
// BUT: 여기서 조건처리는 독립성을 보장하지못하고, 신뢰성이 낮아지므로 지양하자!
// beforeEach(async () => {
//   await render(<TextField className={'my-class'} />);
// });

//-------------

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // renderAPI를 호출 -> 테스트 환경의 jsDOM에 리엑트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM:Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  await render(<TextField className={'my-class'} />);

  // vitest의 expect 함수를 사용하여 기대 결과를 검증
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug();

  expect(textInput).toHaveClass('my-class');
});

// it -> test 함수의 alias (기능상의 차이는 상관없다.)
it('should be ~~~~', () => {});
test('If ~~~~, ~~~~', () => {});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });

  // it 함수하나가 단위테스트의 단위
  it('기본 placeholder가 "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textInput).toBeInTheDocument();
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
    // 매쳐(Matcher) -> 기대하는 결과를 검증하기 위해 사용되는 api들 ex) toBeInTheDocument()
  });

  it('placeholder props에 따라 placeholder가 변경된다.', async () => {
    const placeholder = '상품명을 입력해주세요.';
    await render(<TextField placeholder={placeholder} />);

    const textInput = screen.getByPlaceholderText(placeholder);
    expect(textInput).toBeInTheDocument();
  });
});
