import React, { useContext, useEffect, useRef, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContextProvider";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";

const Login = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // const [otp, setOtp] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);
  // const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  useEffect(() => {
    if (!loading && user?.uid && user.emailVerified) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };
  const handleLoginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };
  // const setupRecaptcha = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier( auth,'recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       onSignInSubmit();
  //     }
  // })}

  // const handleSendOTP = async () => {
  //   try {
  //     setupRecaptcha();
  //     const appVerifier = window.recaptchaVerifier;

  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       phone,
  //       appVerifier
  //     );
  //     setConfirmationResult(confirmation);
  //     alert("OTP đã được gửi!");
  //   } catch (error) {
  //     console.error("Lỗi gửi OTP:", error.message);
  //   }
  // };

  // const handleVerifyOTP = async () => {
  //   try {
  //     await confirmationResult.confirm(otp);
  //     alert("Xác minh thành công!");
  //   } catch (error) {
  //     console.error("OTP không hợp lệ:", error.message);
  //   }
  // };
  
  // auth.settings.appVerificationDisabledForTesting = true; 
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        alert("Tài khoản chưa được xác minh qua email. Vui lòng kiểm tra hộp thư.");
        return;
      }
      
      alert("Đăng nhập thành công!");
      navigate("/"); // điều hướng về trang chủ hoặc trang nào bạn muốn

    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
  
      // Xử lý lỗi rõ ràng hơn
      if (error.code === "auth/user-not-found") {
        alert("Tài khoản không tồn tại.");
      } else if (error.code === "auth/wrong-password") {
        alert("Mật khẩu không đúng.");
      } else if (error.code === "auth/invalid-email") {
        alert("Email không hợp lệ.");
      } else {
        alert("Đăng nhập thất bại: " + error.message);
      }
    }
    
  };
  if (loading) return <div className="text-center">Đang kiểm tra đăng nhập...</div>;
  document.title='Đăng nhập'

  return (
    <div className="bg-banner  w-full  h-[1000px] sm:h-[1080px] bg-cover bg-no-repeat flex  justify-center relative">
      <h1 className="text-red-700 absolute top-[30px] left-[30px] text-[20px] sm:text-[55px] font-bold text-glow">
        Movie
      </h1>
      <div className="absolute w-96 h-[60%] bg-black bg-opacity-70 top-[10%]">
        <h1 className="ml-8 mt-10 text-white text-[20px] sm:text-3xl font-bold">
          Đăng nhập
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
        {/* <div className="ml-8 mt-5">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+84..."
            className="mb-2 w-80 p-2 text-white bg-black bg-opacity-50 border rounded"
          />
          {console.log(phone)}
          <button
            onClick={handleSendOTP}
            className="w-80 p-2 bg-blue-600 text-white font-bold rounded"
          >
            Gửi mã OTP
          </button>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            className="mt-2 mb-2 w-80 p-2 text-white bg-black bg-opacity-50 border rounded"
          />
          <button
            onClick={handleVerifyOTP}
            className="w-80 p-2 bg-green-600 text-white font-bold rounded"
          >
            Xác minh
          </button>

          <div id="recaptcha-container"></div>
        </div> */}

        <button className="ml-8 mt-5 bg-red-700 text-white h-10 w-80 font-bold" onClick={handleLogin}>
          Đăng nhập
        </button>
        <span className=" flex justify-center mt-5  text-gray-600 text-lg ">
          HOẶC
        </span>
        <button
          onClick={handleLoginWithGoogle}
          className="ml-8 mt-5 bg-white  border h-10 w-80 pl-3 font-bold"
        >
          <span className="flex justify-center">
            <FcGoogle className="mt-1 mr-2" /> Đăng nhập bằng Google
          </span>
        </button>
        <button
          onClick={handleLoginWithFacebook}
          className="ml-8 mt-5 bg-white  border h-10 w-80 pl-3 font-bold"
        >
          <span className="flex justify-center">
            <FaFacebook className="mt-1 mr-2" /> Đăng nhập bằng Facebook
          </span>
        </button>
        <Link
          to="/loginHelp"
          className="flex justify-center mt-5 text-white underline"
        >
          Bạn quên mật khẩu?
        </Link>
        <input type="checkbox" className="ml-8 mt-5 scale-150 " />
        <span className="text-white p-2 font-semibold">Ghi nhớ tôi</span>
        <h3 className="ml-8 mt-5 text-gray-400">
          Bạn mới sử dụng Movie?
          <Link to="/register" className=" text-white font-bold">
            Đăng kí ngay.
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
export default Login;
