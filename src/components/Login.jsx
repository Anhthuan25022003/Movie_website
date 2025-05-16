import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";

import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
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
  const [isOpen, setIsOpen] = useState(false);


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

  // auth.settings.appVerificationDisabledForTesting = true;
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert(
          "Tài khoản chưa được xác minh qua email. Vui lòng kiểm tra hộp thư."
        );
        return;
      }

      alert("Đăng nhập thành công!");
      navigate("/"); 
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
  if (loading)
    return <div className="text-center">Đang kiểm tra đăng nhập...</div>;
  document.title = "Đăng nhập";
  return (
    <div className="bg-banner max-h-[100vh] w-full  h-[1000px] sm:h-[1080px] bg-cover bg-no-repeat flex  justify-center relative">
      <h1 className="text-red-700 absolute top-[30px] left-[30px] text-[20px] sm:text-[55px] font-bold text-glow">
        Movie
      </h1>
      <h1
        className="text-red-700 absolute top-[30px] right-[30px] text-[14px] sm:text-[20px] font-bold text-glow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Đăng nhập
      </h1>
      {isOpen ? (<Modal
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)} 
  style={{
    overlay: {
      position: "fixed",
      zIndex: 9999,
      backgroundColor: "rgba(0, 0, 0, 0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      position: "relative",
      inset: "unset",
      padding: 0,
      background: "transparent",
      border: "none",
      overflow: "visible",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }}
>
        <div className="max-h-[90vh] w-96 h-[100%] bg-black bg-opacity-70 ">
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

          <button
            className="ml-8 mt-5 bg-red-700 text-white h-10 w-80 font-bold"
            onClick={handleLogin}
          >
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
              <FaFacebook className="mt-1 mr-2 text-blue-600" /> Đăng nhập bằng
              Facebook
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
            <Link to="/register" className=" text-white font-bold" >
              Đăng kí ngay.
            </Link>
          </h3>
          <h3 className="ml-8 mt-5 text-white text-[13px] opacity-60">
            Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
            robot.
          </h3>
          <Link
            to="/help"
            className=" ml-8 text-blue-500 text-[13px] underline "
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </Modal>):(<div className=" h-[400px] sm:h-[600px] w-[95%]  relative mt-[40px] sm:mt-[75px] mx-[2.5%]">
     
     <div className="flex flex-col justify-center item-center w-full h-full  text-white ">
       <h1 className="sm:text-[25px] md:font-bold md:text-[50px] text-center content-center px-9 sm:px-36">
         Phim, series không giới hạn và nhiều nội dung khác
       </h1>
       <h4 className="text-center text-[10px] sm:text-[14px]">
         Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
         thành viên của bạn.
       </h4>
       <div className="  flex sm:flex-col  md:flex-row justify-center items-center gap-2">
         <input
           type="email"
           placeholder="Địa chỉ email"
           className="sm:p-4 w-[60%] sm:w-[95%] md:w-[400px] h-[40px] sm:h-[50px] rounded-full p-3 mt-5 bg-slate-600 bg-opacity-70 text-white"
         />
         <button className=" sm:w-[95%] h-[40px] sm:h-[50px] md:w-[100px] bg-red-600 text-white py-2 px-4 mt-5 rounded-full ">
           Bắt đầu
         </button>
       </div>
     </div></div>)}

    </div>
  );
}
export default Login;
