
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const LoginForm = ({ adminLogin }) => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("有効なメールアドレスを入力してください").required("メールアドレスは必須です"),
    password: Yup.string().min(8, "パスワードは8文字以上である必要があります").required("パスワードは必須です"),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values

    setLoading(true)
    setSubmitting(true)

    try {
      
      await adminLogin(email, password)

      
      if (email === "admin@example.com" && password === "password") {
        toast.success("ログインに成功しました。")
        navigate("/dashboard")
      } else {
        toast.error("メールアドレスまたはパスワードが正しくありません。")
      }
    } catch (error) {
      toast.error("ログイン中にエラーが発生しました。")
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-[#2b1d0e] mb-12">ログイン</h1>

      <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, values, handleChange, touched, errors }) => (
          <Form className="w-full max-w-md">
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#2b1d0e] mb-2">
                メールアドレス
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`w-full px-4 py-3 rounded-lg border ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                } transition-colors`}
                placeholder=""
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-[#2b1d0e] mb-2">
                パスワード
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-lg border ${
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
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`w-full py-3 rounded-full text-white font-medium transition-colors ${
                loading || isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              {loading || isSubmitting ? "ログイン中..." : "ログイン"}
            </button>

            <div className="text-center mt-6">
              <a href="#" className="text-[#2b1d0e] hover:underline text-sm">
                パスワードをお忘れの場合
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm

