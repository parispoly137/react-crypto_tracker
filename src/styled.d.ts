import "styled-components";

// DefaultTheme 객체에 사용자 지정 색상 특성 및 타입 종류 선언
// -> theme.ts
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    listColor: string;
    textColor: string;
    accentColor: string;
  }
}
