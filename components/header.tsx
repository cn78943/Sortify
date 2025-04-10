import Image from "next/image";
import logo from "../assets/logo.png"

export default function Header() {
    return (
        <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center h-16">
          {/* 로고 */}
          <a href="/" className="flex items-center">
          <Image src={logo} alt="로고" width={64} height={64}/>
          </a>

          {/* 네비게이션 메뉴 */}
          <nav className="space-x-4 md:block">
            <a
              href="todos"
              className="font-sans text-gray-950 no-underline hover:text-violet-700 transition-colors duration-500"
            >
              일정 확인/편집
            </a>
            <a
              href="teams"
              className="font-sans text-gray-950 no-underline hover:text-violet-700 transition-colors duration-500"
            >
              협업 메뉴
            </a>

            {/* 로그인 버튼 */}
            <a
              href="/login"
              className="font-sans px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800 transition-colors duration-500"
            >
              로그인
            </a>

            {/* 회원가입 버튼 */}
            <a
              href="/signup"
              className="font-sans px-4 py-2 bg-violet-400 text-white rounded-lg hover:bg-violet-700 transition-colors duration-500"
            >
              회원가입
            </a>
          </nav>
        </div>
      </header>
    );
}