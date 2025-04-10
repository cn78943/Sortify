export default function MainPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-full bg-gray-100">
            <div className="text-4xl font-bold text-center mt-10">
                스마트 To-Do
            </div>
            <div className="text-lg text-center mt-4">
                우선순위 큐 및 정렬 알고리즘을 활용해, 할 일을 효율적으로 관리할 수 있도록 설계된 스마트 To-Do 앱입니다.
            </div>
            <div className="flex justify-center mt-8 w-2/4">
                <div className="mt-8 rounded-lg shadow-lg min-w-full min-h-full">
                    이미지용 자리
                </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <a
                    href="/signup"
                    className="font-sans px-4 py-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    사용해보기
                </a>
            </div>
        </div>
    );
}
