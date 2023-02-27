import { DefaultTheme } from "styled-components";

// styled.d.ts 파일에서 정의한 DefaultTheme 객체 특성의 타입에 맞게 color 설정
// -> index.tsx
const theme: DefaultTheme = {
  bgColor: "#2f3640",
  listColor: "#f5f6fa",
  textColor: "#555d58",
  accentColor: "#9c88ff",
};

export { theme };
