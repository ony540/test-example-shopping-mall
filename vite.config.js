import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    // vitest에서 제공하는 글로벌 함수들 임포트없이 사용가능
    globals: true,
    // nodejs에서는 dom이 없기때문에 컴포넌트가 그려지는지 확인하기 위한 환경
    //jsdom WAHATWG의 DOM과 HTML을 노드제이에스 환경에서 사용할 수 있도록 순수 자바스크립트로 구현한 것.
    // 브라우저 구현과는 다른 부분이 존재하며 실제로 눈으로 볼 수 있는 것이 아니다.
    environment: 'jsdom',
    // 테스트 실행을 위한 설정들
    setupFiles: './src/utils/test/setupTests.js',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
