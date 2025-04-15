import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username,
          email,
          password,
        }
      );

      alert("회원가입 완료!");
      console.log("회원가입 성공:", response.data);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-violet-400 mb-6 text-center">
          회원가입
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              사용자 이름
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              placeholder="예: 홍길동"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              placeholder="예: test@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              placeholder="6자 이상 입력"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-400 text-white py-2 rounded-lg hover:bg-violet-700 transition-colors duration-300"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
