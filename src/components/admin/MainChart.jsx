import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronLeft, ChevronRight, User, Users, Gift } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"


const ageData = [
    { age: "10代未満", male: 150, female: 70, other: 10, noAnswer: 5 },
    { age: "10代", male: 180, female: 120, other: 15, noAnswer: 10 },
    { age: "20代", male: 200, female: 250, other: 30, noAnswer: 15 },
    { age: "30代", male: 220, female: 280, other: 35, noAnswer: 20 },
    { age: "40代", male: 200, female: 250, other: 30, noAnswer: 15 },
    { age: "50代", male: 280, female: 180, other: 20, noAnswer: 10 },
    { age: "60代", male: 180, female: 120, other: 15, noAnswer: 5 },
    { age: "70代", male: 100, female: 60, other: 5, noAnswer: 0 },
    { age: "80代", male: 70, female: 40, other: 0, noAnswer: 0 },
    { age: "90代以上", male: 30, female: 20, other: 0, noAnswer: 0 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const total = data.male + data.female + data.other + data.noAnswer

      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md text-sm">
          <p className="font-bold">{`${total}人`}</p>
          <p className="text-orange-500">{`男性: ${data.male}人`}</p>
          <p className="text-amber-300">{`女性: ${data.female}人`}</p>
          <p className="text-amber-100">{`その他: ${data.other}人`}</p>
          <p className="text-gray-300">{`回答なし: ${data.noAnswer}人`}</p>
        </div>
      )
    }
    return null
  }

  
  const prevMonth = () => {
    const month = Number.parseInt(currentMonth)
    setCurrentMonth(month === 1 ? "12" : (month - 1).toString().padStart(2, "0"))
  }

  const nextMonth = () => {
    const month = Number.parseInt(currentMonth)
    setCurrentMonth(month === 12 ? "01" : (month + 1).toString().padStart(2, "0"))
  }



export default function MainChartOne(){
     const [currentMonth, setCurrentMonth] = useState("01")

    return (
        <>
        <main className="flex-1 ml-48 p-6">
          {/* Metric Cards - Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* User Registration Count */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">ユーザー登録数累計</div>
              <div className="text-xs text-gray-500 mb-2">2024年2月1日 - 2024年2月5日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">450</span>
                <span className="text-sm ml-1">人</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">400人 (前月時点の累計)</div>
                <div className="text-xs text-green-500">↑12.5%</div>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">アクティブユーザー</div>
              <div className="text-xs text-gray-500 mb-2">2024年2月1日 - 2024年2月5日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">50</span>
                <span className="text-sm ml-1">人 / 今月</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">12人 (前月時点)</div>
                <div className="text-xs text-green-500">↑316.6%</div>
              </div>
            </div>

            {/* Retention Rate */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">定着率</div>
              <div className="text-xs text-gray-500 mb-2">2024年1月1日 - 2024年1月31日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">10</span>
                <span className="text-sm ml-1">% / 前月</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">12% (前々月)</div>
                <div className="text-xs text-red-500">↓16.6%</div>
              </div>
            </div>

            {/* Average Search Count */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">平均検索回数</div>
              <div className="text-xs text-gray-500 mb-2">2024年2月1日 - 2024年2月5日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">4</span>
                <span className="text-sm ml-1">回 / 今月</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">2回 (前月の今日時点)</div>
                <div className="text-xs text-green-500">↑100%</div>
              </div>
            </div>
          </div>

          {/* Gender-Age Chart */}
          <div className="bg-white p-4 rounded-sm shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">性別・年代比</div>
              <div className="flex items-center">
                <span className="text-sm mr-2">2024年</span>
                <button onClick={prevMonth} className="p-1">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm mx-2">{currentMonth}月</span>
                <button onClick={nextMonth} className="p-1">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={30} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="age" />
                  <YAxis domain={[0, 1000]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="male" stackId="a" fill="#F97316" />
                  <Bar dataKey="female" stackId="a" fill="#FCD34D" />
                  <Bar dataKey="other" stackId="a" fill="#FEF3C7" />
                  <Bar dataKey="noAnswer" stackId="a" fill="#E5E7EB" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center mt-4 text-xs">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-orange-500 mr-1"></div>
                  <span>男性</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-amber-300 mr-1"></div>
                  <span>女性</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-amber-100 mr-1"></div>
                  <span>その他</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 mr-1"></div>
                  <span>回答なし</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Cards - Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Draw Usage Count */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">抽選利用回数</div>
              <div className="text-xs text-gray-500 mb-2">2024年2月1日 - 2024年2月5日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">125</span>
                <span className="text-sm ml-1">回 / 今月</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">85回 (前月の今日時点)</div>
                <div className="text-xs text-green-500">↑47%</div>
              </div>
            </div>

            {/* Account Deletion Count */}
            <div className="bg-white p-4 rounded-sm shadow-sm">
              <div className="text-sm text-gray-600 mb-1">アカウント削除数</div>
              <div className="text-xs text-gray-500 mb-2">2024年2月1日 - 2024年2月5日</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">10</span>
                <span className="text-sm ml-1">人 / 今月</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">8人 (前月の今日時点)</div>
                <div className="text-xs text-green-500">↑25%</div>
              </div>
            </div>
          </div>
        </main>
        </>
    )
}