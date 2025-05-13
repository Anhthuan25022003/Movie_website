// import IconRatingHalf from "../assets/rating-half.png";
// import IconRating from "../assets/rating.png";
// import ImgMovie from "../assets/temp-1.jpeg";
// import IconPlay from "../assets/play-button.png";

import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className=" h-[400px] sm:h-[600px] w-[95%] bg-banner bg-cover bg-center bg-no-repeat relative mt-[40px] sm:mt-[75px] mx-[2.5%]">
     
      <div className="flex flex-col justify-center item-center w-full h-full bg-banner bg-cover bg-center ">
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
      </div>

      {/* <div className="flex flex-col md:flex-row items-center justify-between absolute md:top-1/2 top-10 -translate-x-1/2 left-1/2 md:-translate-y-1/2 w-full ">
        <div className="md:w-[50%] w-full ">
          <div className="flex flex-col space-y-6 items-start p-10">

            <div className="flex flex-col space-y-4">
              <h1 className="text-[40px] font-bold text-white ">
                Nghe nói em thích tôi
              </h1>
              <div className="flex items-center space-x-3">
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
              </div>
              <p className="text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting,
              </p>
            </div>

            <div className="flex items-center space-x-5">
              <button className="py-2 px-3 bg-black  text-white border border-black font-bold"
              onClick={()=>alert("ello")}>
                Chi tiết
              </button>
              <button className="py-2 px-3 bg-gradient-to-r from-red-600 to-red-300 text-white font-bold"
              onClick={()=>alert("Tu tu")}>
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
             <img src={IconPlay} alt="play" className="w-16 h-16" /> 
            </button>
            <img
              src={ImgMovie}
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div> 
       </div>  */}
    </div>
  );
};

export default Banner;
