import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// 잘못된 URL로 접근했을 때 나오는 페이지
// useNavigate와 setTimeout을 이용하여 자동으로 홈으로 이동
export default function NotFound() {
  const navigate = useNavigate();

  // 최초 렌더링 때만 사용하는 함수이므로, useEffect 사용
  useEffect(() => {
    setTimeout(() => {
      // -> App.tsx (-> Coins.tsx)
      navigate("/");
    }, 2000);
  }, [navigate]);

  return <h1>404 Not Found</h1>;
}
