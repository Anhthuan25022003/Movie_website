const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-4 gap-8">
        {/* Cột 1: Thông tin chung */}
        <div>
          <h3 className="font-semibold mb-2 border-b border-gray-400 pb-1">
            THÔNG TIN CHUNG
          </h3>
          <p>Website cung cấp phim chất lượng cao với phụ đề tiếng Việt.</p>
          <p>Thưởng thức hàng ngàn bộ phim miễn phí mọi lúc, mọi nơi.</p>
        </div>

        {/* Cột 2: Danh mục phổ biến */}
        <div>
          <h3 className="font-semibold mb-2 border-b border-gray-400 pb-1">
            DANH MỤC PHỔ BIẾN
          </h3>
          <ul className="space-y-1">
            <li>Phim Lẻ</li>
            <li>Phim Bộ</li>
            <li>Phim Hành Động</li>
            <li>Phim Kinh Dị</li>
            <li>Phim Hoạt Hình</li>
            <li>Phim Chiếu Rạp</li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ & Điều khoản */}
        <div>
          <h3 className="font-semibold mb-2 border-b border-gray-400 pb-1">
            HỖ TRỢ & LIÊN HỆ
          </h3>
          <p>Email: support@webphim.com</p>
          <p>Hotline: 1900 1000</p>
          <p>Facebook: <a href="https://www.facebook.com/" className="underline">facebook.com/webphim</a></p>
          <p>Zalo: 0905.123.456</p>
          <p className="mt-4">
            <a href="#" className="underline">Chính sách bảo mật</a> | 
            <a href="#" className="underline ml-2">Điều khoản sử dụng</a>
          </p>
       </div>
       <div className="mb-2">
       <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.392672262983!2d107.80693607460691!3d16.416013230062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31419b28ea628e1d%3A0x4f78fb126a80391c!2zSGnhu4d1IEtpbSBBbmg!5e1!3m2!1svi!2s!4v1744712153168!5m2!1svi!2s"
        width="150"
        height="150"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe> 
       </div>
      </div>

      {/* Bản quyền */}
      <div className="bg-[#082A4D] text-center py-3 text-xs">
        © Copy right 2025 LeSiThuan.
      </div>
    </footer>
  );
};

export default Footer;
