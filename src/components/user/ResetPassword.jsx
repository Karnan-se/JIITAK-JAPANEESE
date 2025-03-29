
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { verifyToken } from "../../features/api/PasswordRest"

const ResetPasswordConfirm = ({ resetPassword }) => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tokenData, setTokenData] = useState({ token: "", id: "" })

  const navigate = useNavigate()
  const location = useLocation()

  // Extract token and ID from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get("token")
    const id = params.get("id")

    if (!token || !id) {
      toast.error("トークンまたはIDが見つかりません")
      navigate("/reset-password")
      return
    }

    setTokenData({ token, id })
  }, [location, navigate])

  // Validation schema
  const validationSchema = Yup.object({
    password: Yup.string().min(8, "パスワードは8文字以上である必要があります").required("パスワードは必須です"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "パスワードが一致しません")
      .required("パスワード確認は必須です"),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true)
    setSubmitting(true)

    try {
      // Use the stored token data
      const { token, id } = tokenData

      if (!token || !id) {
        throw new Error("トークンまたはIDが見つかりません")
      }

      // Call API to reset password - this will verify the token and update the password
      const success = await verifyToken(token, id, values.password)

      if (success) {
        toast.success("パスワードが正常にリセットされました")
        navigate("/login")
      } else {
        throw new Error("パスワードのリセットに失敗しました")
      }
    } catch (error) {
      // Handle specific error cases
      if (error.message === "INVALID_TOKEN") {
        toast.error("無効なトークンまたは期限切れです")
        navigate("/reset-password")
      } else if (error.message === "USER_NOT_FOUND") {
        toast.error("ユーザーが見つかりません")
        navigate("/reset-password")
      } else {
        toast.error(error.message || "パスワードのリセットに失敗しました")
      }
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-[#2b1d0e] mb-8">新しいパスワードの設定</h1>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className="w-full max-w-md">
            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-[#2b1d0e] mb-2">
                新しいパスワード
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

            {/* Confirm Password */}
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-[#2b1d0e] mb-2">
                パスワード確認
              </label>
              <div className="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-400"
                  } transition-colors`}
                  placeholder=""
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`w-full py-3 rounded-full text-white font-medium transition-colors ${
                loading || isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              {loading || isSubmitting ? "処理中..." : "パスワードを変更する"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ResetPasswordConfirm

