const ContactPage = () => {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center bg-black p-6 animate-fadeIn">
      {/* Tiêu đề có hiệu ứng hover */}
      <h1 className="text-4xl font-bold mb-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:text-red-500">
        Liên Hệ
      </h1>

      <p className="text-lg max-w-2xl text-center">
        Trang web này cung cấp thông tin về các bộ phim mới nhất, phim hot và các bộ phim được đánh giá cao. 
        Bạn có thể tìm kiếm phim theo tên, xem thông tin chi tiết và cập nhật danh sách phim yêu thích của mình.
      </p>

      <p className="mt-4 text-lg">
        Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ qua email:{" "}
        <a href="https://mail.google.com/mail" className="text-blue-400 hover:underline">
          support@movieweb.com
        </a>
      </p>
    </div>
  );
};

export default ContactPage;
