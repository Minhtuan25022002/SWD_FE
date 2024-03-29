import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleLoginAdmin } from "../../services/userService";
import "./LoginPage.scss";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      passWord: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Chưa điền user name"),
      passWord: Yup.string().required("Chưa điền mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        let data = await handleLoginAdmin(values.userName, values.passWord);
        if (data && !_.isEmpty(data.token)) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", data.user.username);
          window.location.href = "/admin";
        }
      } catch (error) {
        console.error(error);
        setErrors({ general: "Tên đăng nhập hoặc mật khẩu không đúng!" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-login">Vui lòng điền thông tin admin</div>
          <form onSubmit={formik.handleSubmit} className="col-12">
            <div className="form-group login-input">
              <label>Tài khoản:</label>
              <br />
              <span>
                <FontAwesomeIcon className="icon-user" icon={faUser} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
              </span>
              {formik.touched.userName && formik.errors.userName && (
                <div className="error-message">{formik.errors.userName}</div>
              )}
            </div>
            <div className="form-group login-input">
              <label>Mật khẩu:</label>
              <div className="custom-input-password">
                <FontAwesomeIcon icon={faLock} />

                <input
                  type={formik.values.showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  name="passWord"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passWord}
                />
                <span
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword
                    )
                  }
                >
                  {formik.values.showPassword ? (
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  )}
                </span>
              </div>
              {formik.touched.passWord && formik.errors.passWord && (
                <div className="error-message">{formik.errors.passWord}</div>
              )}
            </div>
            <div className="error-message col-12">{formik.errors.general}</div>
            <div className="col-12">
              <button
                type="submit"
                className="btn-login"
                disabled={formik.isSubmitting}
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
