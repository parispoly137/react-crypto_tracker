import { DefaultTheme } from "styled-components";

// styled.d.ts 파일에서 정의한 DefaultTheme 객체 특성의 타입에 맞게 color 설정
// -> index.tsx
export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentColor: "#9c88ff",
  listColor: "#f5f6fa",
};

export const lightTheme = {
  bgColor: "#f5f6fa",
  textColor: "#2f3640",
  accentColor: "#00a8ff",
  listColor: "#2f3640",
};
