import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                {
                    email,
                    password,
                }
            );

            console.log('로그인 성공:', response);
            alert('로그인 성공!');
            localStorage.setItem('token', response.data);
            router.push('/');
        } catch (err: any) {
            const message =
                err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-violet-400 text-center mb-6">
                    로그인
                </h2>

                {error && (
                    <div className="mb-4 text-sm text-red-500 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 이메일 */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="이메일을 입력하세요"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-violet-400 text-white rounded-lg hover:bg-violet-700 transition-colors duration-300"
                    >
                        로그인
                    </button>
                </form>

                {/* 회원가입 링크 */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    계정이 없으신가요?{' '}
                    <a
                        href="/signup"
                        className="text-violet-700 hover:underline"
                    >
                        회원가입
                    </a>
                </p>
            </div>
        </div>
    );
}
