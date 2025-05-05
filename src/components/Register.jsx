import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";

const Register = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // const [otp, setOtp] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);
  // const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user?.uid) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const auth = getAuth();

  // auth.settings.appVerificationDisabledForTesting = true;
  const handleRegisterWithEmail = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert(" Vui lòng kiểm tra Email để hoàn tất đăng kí");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Tài khoản không tồn tại.");
      } else if (error.code === "auth/wrong-password") {
        alert("Mật khẩu không đúng.");
      } else if (error.code === "auth/invalid-email") {
        alert("Email không hợp lệ.");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Email đã tồn tại.");
      } else {
        alert("Đăng nhập thất bại: " + error.message);
      }
    }
    navigate("/login");

  };
  if (loading) return <div>Đang kiểm tra ...</div>;

  return (
    <div className="bg-banner  w-full  h-[1000px] sm:h-[1080px] bg-cover bg-no-repeat flex  justify-center relative">
      <h1 className="text-red-700 absolute top-[30px] left-[30px] text-[20px] sm:text-[55px] font-bold text-glow">
        Movie
      </h1>
      <div className="absolute w-96 h-[60%] bg-black bg-opacity-70 top-[10%]">
        <h1 className="ml-8 mt-10 text-white text-[20px] sm:text-3xl font-bold">
          Đăng kí
        </h1>
        <input
          className="ml-8 mt-8 text-white bg-black bg-opacity-50 border h-12 w-80 pl-3"
          placeholder="Email hoặc số điện thoại di động"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative ml-8 mt-5 w-80  ">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2 text-white bg-black bg-opacity-50 border rounded"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          className="ml-8 mt-5 bg-red-700 text-white h-10 w-80 font-bold"
          onClick={handleRegisterWithEmail}
        >
          Đăng kí
        </button>

        <h3 className="ml-8 mt-5 text-gray-400">
          Bạn đã có tài khoản Movie?
          <Link to="/login" className=" text-white font-bold">
            Đăng nhập ngay.
          </Link>
        </h3>
        <h3 className="ml-8 mt-5 text-white text-[13px] opacity-60">
          Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
          robot.
        </h3>
        <Link to="/help" className=" ml-8 text-blue-500 text-[13px] underline ">
          Tìm hiểu thêm
        </Link>
      </div>
    </div>
  );
};
export default Register;
