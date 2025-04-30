import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // next/navigation 아님!
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkAuth(); // 첫 렌더링 시 확인

        const handleRouteChange = () => {
            checkAuth(); // 경로가 바뀔 때마다 확인
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center h-16">
                <a href="/" className="flex items-center">
                    <Image src={logo} alt="로고" width={64} height={64} />
                </a>

                <nav className="space-x-4 md:block">
                    <a href="/todos" className="hover:text-violet-700">
                        일정 확인/편집
                    </a>
                    <a href="/teams" className="hover:text-violet-700">
                        협업 메뉴
                    </a>

                    {!isLoggedIn ? (
                        <>
                            <a
                                href="/login"
                                className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-800"
                            >
                                로그인
                            </a>
                            <a
                                href="/signup"
                                className="px-4 py-2 bg-violet-400 text-white rounded-lg hover:bg-violet-700"
                            >
                                회원가입
                            </a>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600"
                        >
                            로그아웃
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
