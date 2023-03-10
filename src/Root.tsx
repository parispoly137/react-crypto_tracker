import { Outlet } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

// 전역으로 CSS 스타일을 적용시키는 컴포넌트
const GlobalStyle = createGlobalStyle`

// Reset-CSS
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}

// custom
a{
  text-decoration:none;
  color:inherit;
}
button{
  background-color: inherit;
  cursor: pointer;
  border: none;
}

body{
  background-color: ${(props) => props.theme.bgColor};
  font-family: 'Comfortaa', cursive ;
  display: flex;
  justify-content: center;

}

`;

export default function Root() {
  const isDark = useRecoilValue(isDarkAtom); // atom의 state를 읽어온다.

  return (
    <HelmetProvider>
      {/* index.html의 head 부분에 직접 접근하지 않고 Helmet을 통해 추가 */}
      <Helmet>
        {/* 폰트 설정 */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      {/* theme.ts로부터 기본 theme에 대한 객체를 받아와 적용 */}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* 위에서 정의한 css 코드들을 전역으로 적용 */}
        <GlobalStyle />
        {/* 기본 Root인 App.tsx의 children을 렌더링해주는 Outlet 컴포넌트 */}
        {/* -> Coins.tsx || Coin.tsx || NotFound.tsx */}
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <Outlet />
      </ThemeProvider>
    </HelmetProvider>
  );
}
