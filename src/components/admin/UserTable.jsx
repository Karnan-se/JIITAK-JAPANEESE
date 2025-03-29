
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredEmail, setHoveredEmail] = useState(null)
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 })
  const [searchTerm, setSearchTerm] = useState("")

  // Sample user data without IDs
  const allUsers = [
    {
      nickname: "ゆうと",
      email: "example1@example.com",
      birthDate: "1992年 12月",
      gender: "男性",
      location: "東京都",
      registrationDate: "2024年 01月 12日",
    },
    {
      nickname: "ニックネーム最大12文字",
      email: "user234@example.net",
      birthDate: "1987年 5月",
      gender: "女性",
      location: "東京都",
      registrationDate: "2024年 01月 12日",
    },
    {
      nickname: "わんこ好き",
      email: "test_user@gmail.com",
      birthDate: "1996年 10月",
      gender: "男性",
      location: "東京都",
      registrationDate: "2024年 01月 12日",
    },
    {
      nickname: "はるかぜ",
      email: "dummy_email_567@yahoo.co.jp",
      birthDate: "1998年 2月",
      gender: "男性",
      location: "静岡県",
      registrationDate: "2024年 01月 12日",
    },
    {
      nickname: "あおい",
      email: "ecampleaddress124e23@outlook.co.jp",
      birthDate: "1978年 5月",
      gender: "女性",
      location: "埼玉県",
      registrationDate: "2024年 01月 11日",
    },
    {
      nickname: "ポンたろう",
      email: "random.user@example.org",
      birthDate: "1978年 6月",
      gender: "女性",
      location: "栃木県",
      registrationDate: "2024年 01月 11日",
    },
    {
      nickname: "まさやん",
      email: "email1234@example.co.jp",
      birthDate: "1972年 8月",
      gender: "回答しない",
      location: "鹿児島県",
      registrationDate: "2024年 01月 11日",
    },
    {
      nickname: "なつこ",
      email: "user_test456@gmail.com",
      birthDate: "1969年 11月",
      gender: "回答しない",
      location: "茨城県",
      registrationDate: "2024年 01月 11日",
    },
    {
      nickname: "ぴょんぴょん",
      email: "example_email@yahoo.com",
      birthDate: "1984年 4月",
      gender: "女性",
      location: "東京都",
      registrationDate: "2024年 01月 10日",
    },
    {
      nickname: "ひまわりさん",
      email: "dummy.address@example.net",
      birthDate: "1988年 4月",
      gender: "その他",
      location: "福岡",
      registrationDate: "2024年 01月 10日",
    },
    {
      nickname: "たなか",
      email: "tanaka@example.jp",
      birthDate: "1990年 7月",
      gender: "男性",
      location: "大阪府",
      registrationDate: "2024年 01月 10日",
    },
    {
      nickname: "さくら",
      email: "sakura@example.com",
      birthDate: "1995年 3月",
      gender: "女性",
      location: "京都府",
      registrationDate: "2024年 01月 09日",
    },
    {
      nickname: "やまだ",
      email: "yamada@example.net",
      birthDate: "1982年 9月",
      gender: "男性",
      location: "北海道",
      registrationDate: "2024年 01月 09日",
    },
    {
      nickname: "すずき",
      email: "suzuki@example.org",
      birthDate: "1975年 11月",
      gender: "女性",
      location: "沖縄県",
      registrationDate: "2024年 01月 09日",
    },
    {
      nickname: "たろう",
      email: "taro@example.co.jp",
      birthDate: "1993年 6月",
      gender: "男性",
      location: "愛知県",
      registrationDate: "2024年 01月 08日",
    },
    {
      nickname: "はなこ",
      email: "hanako@example.jp",
      birthDate: "1989年 4月",
      gender: "女性",
      location: "広島県",
      registrationDate: "2024年 01月 08日",
    },
    {
      nickname: "けんじ",
      email: "kenji@example.com",
      birthDate: "1980年 2月",
      gender: "男性",
      location: "福岡県",
      registrationDate: "2024年 01月 08日",
    },
    {
      nickname: "あきこ",
      email: "akiko@example.net",
      birthDate: "1986年 8月",
      gender: "女性",
      location: "宮城県",
      registrationDate: "2024年 01月 07日",
    },
    {
      nickname: "しょうた",
      email: "shota@example.org",
      birthDate: "1997年 5月",
      gender: "男性",
      location: "神奈川県",
      registrationDate: "2024年 01月 07日",
    },
    {
      nickname: "みどり",
      email: "midori@example.co.jp",
      birthDate: "1991年 9月",
      gender: "女性",
      location: "千葉県",
      registrationDate: "2024年 01月 07日",
    },
    // Add more users to make pagination meaningful
  ]

  // Search functionality
  const filteredUsers = allUsers.filter(
    (user) =>
      user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const usersPerPage = 10
  const totalUsers = filteredUsers.length
  const totalPages = Math.ceil(totalUsers / usersPerPage)

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const handleMouseEnter = (email, e) => {
    const rect = e.target.getBoundingClientRect()
    setHoveredEmail(email)
    setHoveredPosition({
      x: rect.left,
      y: rect.bottom,
    })
  }

  const handleMouseLeave = () => {
    setHoveredEmail(null)
  }

  // Function to truncate text with ellipsis if it's too long
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <main className="flex-1 ml-48 ">
      <div className="bg-white rounded-sm shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">登録ユーザー一覧</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="ニックネーム/メールアドレスで検索"
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 cursor-pointer">
                  <div className="flex items-center">
                    No. <span className="ml-1">▲</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">ニックネーム</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">メールアドレス</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">生年月</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">性別</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">居住地</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">登録日</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                // Calculate the actual row number based on current page
                const rowNumber = (currentPage - 1) * usersPerPage + index + 1
                // Format the row number with leading zero if needed
                const formattedRowNumber = rowNumber < 10 ? `0${rowNumber}` : rowNumber.toString()

                return (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm">{formattedRowNumber}.</td>
                    <td className="py-4 px-4 text-sm max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.nickname}
                    </td>
                    <td
                      className="py-4 px-4 text-sm max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap relative"
                      onMouseEnter={(e) => handleMouseEnter(user.email, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {truncateText(user.email, 25)}
                    </td>
                    <td className="py-4 px-4 text-sm">{user.birthDate}</td>
                    <td className="py-4 px-4 text-sm">{user.gender}</td>
                    <td className="py-4 px-4 text-sm">{user.location}</td>
                    <td className="py-4 px-4 text-sm">{user.registrationDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            {totalUsers.toLocaleString()}人中 - {Math.min(usersPerPage, totalUsers)}人表示
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNumber
              if (totalPages <= 5) {
                pageNumber = i + 1
              } else if (currentPage <= 3) {
                pageNumber = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i
              } else {
                pageNumber = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === pageNumber ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-1">...</span>
                <button
                  onClick={() => goToPage(totalPages)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip for email */}
      {hoveredEmail && (
        <div
          className="fixed z-50 bg-[#2b1d0e] text-white py-2 px-4 rounded-sm text-sm"
          style={{
            left: hoveredPosition.x,
            top: hoveredPosition.y + 5,
          }}
        >
          {hoveredEmail}
        </div>
      )}
    </main>
  )
}

export default UserTable

