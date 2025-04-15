import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { useRouter } from "next/router";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // 토큰이 존재하면 true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center h-16">
        {/* 로고 */}
        <a href="/" className="flex items-center">
          <Image src={logo} alt="로고" width={64} height={64} />
        </a>

        {/* 네비게이션 메뉴 */}
        <nav className="space-x-4 md:block">
          <a
            href="/todos"
            className="font-sans text-gray-950 no-underline hover:text-violet-700 transition-colors duration-500"
          >
            일정 확인/편집
          </a>
          <a
            href="/teams"
            className="font-sans text-gray-950 no-underline hover:text-violet-700 transition-colors duration-500"
          >
            협업 메뉴
          </a>

          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="font-sans px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800 transition-colors duration-500"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="font-sans px-4 py-2 bg-violet-400 text-white rounded-lg hover:bg-violet-700 transition-colors duration-500"
              >
                회원가입
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="font-sans px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition-colors duration-500"
            >
              로그아웃
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
