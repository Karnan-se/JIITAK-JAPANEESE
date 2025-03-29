
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { formatDateJP } from "../../utils/dateFormater"
import { Jregister } from "../../features/api/jregister"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserCredentials } from "../../features/authSlice"

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentDate = formatDateJP(new Date())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)

  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const validationSchema = Yup.object({
    nickname: Yup.string().max(12, "ニックネームは12文字以内で入力してください").required("ニックネームは必須です"),
    email: Yup.string().email("有効なメールアドレスを入力してください").required("メールアドレスは必須です"),
    password: Yup.string().min(8, "パスワードは8文字以上である必要があります").required("パスワードは必須です"),
    birthYear: Yup.string().required("生年は必須です"),
    birthMonth: Yup.string().required("生月は必須です"),
    gender: Yup.string().required("性別は必須です"),
    location: Yup.string().required("居住地は必須です"),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true)
    setSubmitting(true)

    try {
      const birthDate = `${values.birthYear}年 ${values.birthMonth}月`

      const userData = {
        nickname: values.nickname,
        email: values.email,
        password: values.password,
        birthDate: birthDate,
        gender: values.gender,
        location: values.location,
        registrationDate: currentDate,
      }
      console.log("registered successfully", userData)

      const registeredUser = await Jregister(userData)
      console.log(registeredUser, "registereduser")
      dispatch(setUserCredentials(registeredUser))
      if (!registeredUser) {
        throw new Error("registration failed")
      }

      toast.success("登録が完了しました")
      resetForm()
      navigate("/")
    } catch (error) {
      toast.error("登録中にエラーが発生しました")
      console.error(error)
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2b1d0e] mb-6">ユーザー登録</h1>

      <Formik
        initialValues={{
          nickname: "",
          email: "",
          password: "",
          birthYear: "",
          birthMonth: "",
          gender: "",
          location: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className="w-full max-w-md">
            {/* Nickname */}
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-[#2b1d0e] mb-1 text-sm">
                ニックネーム
              </label>
              <Field
                id="nickname"
                name="nickname"
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.nickname && errors.nickname
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                } transition-colors`}
                placeholder=""
              />
              <ErrorMessage name="nickname" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#2b1d0e] mb-1 text-sm">
                メールアドレス
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                } transition-colors`}
                placeholder=""
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#2b1d0e] mb-1 text-sm">
                パスワード
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                  } transition-colors`}
                  placeholder=""
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Birth Date */}
            <div className="mb-4">
              <label className="block text-[#2b1d0e] mb-1 text-sm">生年月</label>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Field
                    as="select"
                    id="birthYear"
                    name="birthYear"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      touched.birthYear && errors.birthYear
                        ? "border-red-500"
                        : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                    } transition-colors`}
                  >
                    <option value="">年を選択</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="birthYear" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="w-1/2">
                  <Field
                    as="select"
                    id="birthMonth"
                    name="birthMonth"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      touched.birthMonth && errors.birthMonth
                        ? "border-red-500"
                        : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                    } transition-colors`}
                  >
                    <option value="">月を選択</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="birthMonth" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-[#2b1d0e] mb-1 text-sm">性別</label>
              <Field
                as="select"
                id="gender"
                name="gender"
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.gender && errors.gender
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                } transition-colors`}
              >
                <option value="">性別を選択</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="その他">その他</option>
                <option value="回答しない">回答しない</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Location - Changed to text input */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-[#2b1d0e] mb-1 text-sm">
                居住地
              </label>
              <Field
                id="location"
                name="location"
                type="text"
                className={`w-full px-4 py-2 rounded-lg border ${
                  touched.location && errors.location
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                } transition-colors`}
                placeholder="例: 東京都"
              />
              <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`w-full py-2.5 rounded-full text-white font-medium transition-colors ${
                loading || isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              {loading || isSubmitting ? "登録中..." : "登録する"}
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <Link to={"/login"} className="text-[#2b1d0e] hover:underline text-sm">
                すでにアカウントをお持ちの方はこちら
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistrationForm

