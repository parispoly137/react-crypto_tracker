import "styled-components";
// yarn add styled-components
// yarn add @types/styled-components
// yarn add react-is

// theme에 정의한 특성에 대한 타입들을 선언
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
  }
}
