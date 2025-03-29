"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { passswordreset } from "../../features/api/PasswordRest"
import { useNavigate } from "react-router-dom"

const PasswordResetForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  
  const validationSchema = Yup.object({
    email: Yup.string().email("有効なメールアドレスを入力してください").required("メールアドレスは必須です"),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true)
    setSubmitting(true)

    try {
      
     
       const response =  await passswordreset(values.email)
      console.log(response)

      toast.success("パスワード再設定用URLを送信しました")
      navigate("/")
    } catch (error) {
      toast.error("メール送信中にエラーが発生しました")
      console.error(error)
    } finally {
      setLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-[#2b1d0e] mb-8">パスワード再設定</h1>

      <div className="text-center mb-8 max-w-md">
        <p className="text-[#2b1d0e]">現在使っているメールアドレスを入力してください。</p>
        <p className="text-[#2b1d0e]">パスワード再設定用URLをメールで送信いたします。</p>
      </div>

      <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, touched, errors }) => (
          <Form className="w-full max-w-md">
            <div className="mb-8">
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

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={`w-full py-3 rounded-full text-white font-medium transition-colors ${
                loading || isSubmitting ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              {loading || isSubmitting ? "送信中..." : "パスワード再設定用URLを送信する"}
            </button>

            <div className="text-center mt-6">
              <Link to="/login" className="text-[#2b1d0e] hover:underline text-sm">
                ログイン画面にもどる
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PasswordResetForm

