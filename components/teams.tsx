import React, { useState } from "react";

type Group = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};

const groupList: Group[] = [
  {
    id: 1,
    name: "Frontend Study",
    description: "함께 프론트엔드 기술을 공부하는 그룹입니다.",
    tags: ["프론트엔드", "스터디", "React"],
  },
  {
    id: 2,
    name: "여행 플래너",
    description: "여행 일정 공유와 계획을 위한 그룹입니다.",
    tags: ["여행", "일정공유", "자유"],
  },
  {
    id: 3,
    name: "취업 준비팀",
    description: "취업을 위한 코테 및 면접 준비를 함께해요.",
    tags: ["취업", "스터디", "면접"],
  },
];

export default function Teams() {
  const [searchTag, setSearchTag] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [showJoined, setShowJoined] = useState(true); // ✅ 토글 상태 추가

  const filteredGroups = groupList.filter((group) =>
    group.tags.some((tag) =>
      tag.toLowerCase().includes(searchTag.toLowerCase())
    )
  );

  const handleJoin = (group: Group) => {
    if (!joinedGroups.find((g) => g.id === group.id)) {
      setJoinedGroups((prev) => [...prev, group]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">🔍 그룹 찾기</h1>
      <p className="mb-4 text-gray-700">
        협업 팀, 일정 공유, 관심사 기반 그룹을 찾아 참여해보세요.
      </p>

      {/* 참여 중인 그룹 섹션 (토글 포함) */}
      {joinedGroups.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-green-700">
              ✅ 참여 중인 그룹
            </h2>
            <button
              onClick={() => setShowJoined((prev) => !prev)}
              className="text-sm text-green-600 hover:underline"
            >
              {showJoined ? "숨기기" : "펼치기"}
            </button>
          </div>
          {showJoined && (
            <ul className="divide-y divide-green-200 border rounded-md overflow-hidden bg-white">
              {joinedGroups.map((group) => (
                <li key={group.id} className="p-4 hover:bg-green-50 transition">
                  <div>
                    <h3 className="font-semibold text-green-800">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {group.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 태그 검색 */}
      <input
        type="text"
        placeholder="예: 스터디, 여행, 취업..."
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        className="w-full max-w-md border rounded-md px-4 py-2 mb-8 shadow-sm"
      />

      {/* 추천 그룹 / 검색 결과 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {(searchTag ? filteredGroups : groupList).map((group) => (
          <div
            key={group.id}
            className="border rounded-xl p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold text-violet-800">
              {group.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{group.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {group.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-violet-100 text-violet-700 px-2 py-1 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleJoin(group)}
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-1.5 rounded-md transition"
            >
              참여하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
