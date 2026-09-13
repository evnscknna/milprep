import type {
  BannedItem,
  ChecklistItem,
  ChecklistSection,
  CostRow,
  GateLocation,
  GearCategory,
  SlideMeta,
} from '../types';

export const GATE_LOCATIONS: GateLocation[] = [
  {
    id: 'phoenix',
    switchLabel: 'Phoenix',
    gateName: 'Cổng 1',
    address: 'Cổng 1 – Trường Quân sự Quân khu 7 (QSQK7)',
    coordinates: '10.8558076, 106.6220975',
    googleMapsUrl:
      'https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+Qu%C3%A2n+S%E1%BB%B1+Qu%C3%A2n+Khu+7/@10.8557964,106.6219981,1093m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3175296de7717a5d:0xba889d115910a7b2!2sWOWbuy+Qu%E1%BA%ADn+12!8m2!3d10.8572971!4d106.6173023!16s%2Fg%2F11vdvh3qbb!3m5!1s0x31752a23ce1673cd:0xb8bbbac684445db2!8m2!3d10.8558076!4d106.6220975!16s%2Fg%2F1hc1wk2h8?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D',
    satelliteEmbedUrl: 'https://www.google.com/maps?q=10.8558076,106.6220975&z=18&t=k&output=embed',
  },
  {
    id: 'unicorn',
    switchLabel: 'Unicorn',
    gateName: 'Cổng 3',
    address: 'Cổng 3 – Trường Quân sự Quân khu 7 (QSQK7)',
    coordinates: '10.8572971, 106.6173023',
    googleMapsUrl:
      'https://www.google.com/maps/place/WOWbuy+Qu%E1%BA%ADn+12/@10.8572971,106.6147274,17z/data=!3m1!4b1!4m6!3m5!1s0x3175296de7717a5d:0xba889d115910a7b2!8m2!3d10.8572971!4d106.6173023!16s%2Fg%2F11vdvh3qbb?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D',
    satelliteEmbedUrl: 'https://www.google.com/maps?q=10.8572971,106.6173023&z=18&t=k&output=embed',
    rideHailingTip:
      'Khi đặt xe công nghệ (Grab/Be...), hãy đặt điểm đến là "WOWbuy Quận 12" để tài xế thả đúng ngay Cổng 3, tránh bị lạc hoặc thả nhầm chỗ.',
  },
];

export const STUDENT_PORTAL_URL = 'https://www.tqsqk7.edu.vn/cong-thong-tin-sinh-vien/';

export const STUDENT_PORTAL_GUIDANCE =
  'Tra cứu Đại đội, Tiểu đội và số phòng của mình trước khi lên đường để không bị bỡ ngỡ khi tới nơi.';

export const COST_ROWS: CostRow[] = [
  {
    id: 'cost-food',
    label: 'Tiền ăn (3 bữa/ngày - 26 ngày)',
    amount: 2_600_000,
    note: 'Đóng trọn gói khi nhập học',
  },
  {
    id: 'cost-water',
    label: 'Nước uống (10.000₫/tuần x 4 tuần)',
    amount: 40_000,
  },
  {
    id: 'cost-laundry',
    label: 'Giặt ủi quân trang (nộp ngày ra quân)',
    amount: 35_000,
  },
  {
    id: 'cost-vovinam',
    label: 'Đồng phục võ Vovinam',
    amount: 200_000,
    note: 'Mua trực tiếp tại trường khi vào',
  },
];

export const FIXED_COST_TOTAL = COST_ROWS.reduce((sum, row) => sum + row.amount, 0);

export const PERSONAL_BUDGET = {
  id: 'cost-personal',
  label: 'Dự phòng & chi tiêu cá nhân / căng tin',
  min: 500_000,
  max: 2_000_000,
  step: 50_000,
  defaultAmount: 1_325_000,
  lowThreshold: 600_000,
  highThreshold: 1_800_000,
  lowWarning: 'Hơi ít đó, coi chừng hết tiền giữa khóa!',
  highWarning: 'Nhiều vậy coi chừng bị "hỏi thăm", cẩn thận nha!',
};

export const PACKING_SECTION_A: ChecklistSection = {
  sectionId: 'packing-at-home',
  title: 'Xếp Vali Tại Nhà',
  countsTowardPackingProgress: true,
  items: [
    { id: 'home-01', label: 'Áo cam FPT và quần dài' },
    { id: 'home-02', label: 'Thẻ sinh viên, CCCD, BHYT (giấy tờ tùy thân)' },
    { id: 'home-03', label: 'Tiền mặt (~4.200.000₫ tự bảo quản)' },
    { id: 'home-04', label: 'Vali cá nhân (size 28-30) + 1 balo nhỏ' },
    {
      id: 'home-05',
      label: 'Kim chỉ hoặc bút lông/bút xóa để đánh dấu đồ đạc',
      note: 'Có thể bỏ qua, không bắt buộc để đi tiếp',
      skippableInGate: true,
    },
    {
      id: 'home-06',
      label: 'Thắt lưng hoặc ghim cài dạng lớn (để chỉnh quân phục rộng)',
      note: 'Có thể bỏ qua, không bắt buộc để đi tiếp',
      skippableInGate: true,
    },
    { id: 'home-07', label: 'Tinh thần lạc quan, chịu khó' },
  ],
};

export const BORROWED_GEAR_SECTION: ChecklistSection = {
  sectionId: 'borrowed-gear',
  title: 'Quân Trang Được Trường Cho Mượn (kiểm tra khi nhận)',
  countsTowardPackingProgress: false,
  items: [
    { id: 'borrow-01', label: '02 bộ quân phục' },
    { id: 'borrow-02', label: '01 mũ mềm' },
    { id: 'borrow-03', label: '01 chiếu nằm' },
    { id: 'borrow-04', label: '01 ba lô quân đội' },
    { id: 'borrow-05', label: '01 tấm đắp (mền)' },
    { id: 'borrow-06', label: '01 mùng (màn)' },
  ],
};

export const FIRST_DAY_PURCHASE_SECTION: ChecklistSection = {
  sectionId: 'first-day-purchase',
  title: 'Mua Sắm Ngày Đầu',
  countsTowardPackingProgress: false,
  items: [{ id: 'buy-01', label: 'Mua đồng phục võ Vovinam tại trường (200.000₫)' }],
};

export const GEAR_CATEGORIES: GearCategory[] = [
  {
    id: 'trang-phuc',
    title: 'Trang Phục',
    icon: 'Shirt',
    items: [
      { id: 'gear-tp-01', label: 'Giày bata cũ (Thượng Đình v.v., đi xong bỏ)' },
      { id: 'gear-tp-02', label: 'Dép/sandals' },
      { id: 'gear-tp-03', label: 'Đồ mỏng mau khô (tránh quần nỉ ẩm mốc)' },
      { id: 'gear-tp-04', label: 'Đồ lót giấy 1 lần' },
      { id: 'gear-tp-05', label: '1-2 quần đùi ngủ' },
      { id: 'gear-tp-06', label: 'Áo thun mỏng lót trong quân phục' },
      { id: 'gear-tp-07', label: 'Khăn tắm mỏng' },
      { id: 'gear-tp-08', label: 'Túi nilon đựng đồ bẩn' },
    ],
  },
  {
    id: 've-sinh-ca-nhan',
    title: 'Vệ Sinh & Cá Nhân',
    icon: 'Droplets',
    items: [
      { id: 'gear-vs-01', label: 'Kem chống nắng (mặt + body)', note: 'Cực kỳ cần thiết' },
      { id: 'gear-vs-02', label: 'Bông tẩy trang' },
      { id: 'gear-vs-03', label: 'Khăn giấy khô & ướt (mang nhiều)' },
      { id: 'gear-vs-04', label: 'Chai chiết dầu gội/sữa tắm mini' },
      { id: 'gear-vs-05', label: 'Bàn chải, kem đánh răng' },
      { id: 'gear-vs-06', label: 'Dao cạo râu (nam)' },
      { id: 'gear-vs-07', label: 'Băng vệ sinh/dung dịch vệ sinh (nữ)' },
      { id: 'gear-vs-08', label: 'Gương soi' },
      { id: 'gear-vs-09', label: 'Bodymist' },
      { id: 'gear-vs-10', label: 'Dù che nắng mưa' },
      { id: 'gear-vs-11', label: 'Bộ muỗng đũa riêng' },
      { id: 'gear-vs-12', label: 'Túi tote' },
    ],
  },
  {
    id: 'tu-thuoc',
    title: 'Tủ Thuốc Cá Nhân',
    icon: 'Pill',
    items: [
      { id: 'gear-th-01', label: 'Thuốc cảm/sốt (Panadol, C sủi)' },
      { id: 'gear-th-02', label: 'Men tiêu hóa' },
      { id: 'gear-th-03', label: 'Thuốc tiêu chảy' },
      { id: 'gear-th-04', label: 'Bột bù nước (Oresol)' },
      { id: 'gear-th-05', label: 'Thuốc dị ứng' },
      { id: 'gear-th-06', label: 'Thuốc đau bao tử' },
      { id: 'gear-th-07', label: 'Thuốc đau bụng kinh/túi chườm (nữ)' },
      { id: 'gear-th-08', label: 'Bông băng, thuốc đỏ, urgo' },
      { id: 'gear-th-09', label: 'Thuốc nhỏ mắt' },
      { id: 'gear-th-10', label: 'Dầu gió' },
    ],
  },
  {
    id: 'an-uong-cong-nghe',
    title: 'Ăn Uống & Công Nghệ',
    icon: 'UtensilsCrossed',
    items: [
      { id: 'gear-au-02', label: 'Đồ ăn vặt' },
      { id: 'gear-au-04', label: 'Điện thoại', note: 'Tài khoản sim >= 100k' },
      { id: 'gear-au-05', label: 'Củ sạc + cáp sạc' },
      { id: 'gear-au-06', label: 'Sạc dự phòng' },
      {
        id: 'gear-au-07',
        label: 'Đăng ký gói 4G dùng 4 tuần',
        note: 'Trong trường không có wifi',
      },
    ],
  },
];

export const BANNED_ITEMS: BannedItem[] = [
  { id: 'ban-01', label: 'Đồ trang sức, tài sản đắt tiền (dây chuyền, nhẫn vàng...)' },
  { id: 'ban-02', label: 'Mang quá nhiều tiền mặt (chỉ mang vừa đủ ~4-5 triệu)' },
  {
    id: 'ban-03',
    label:
      'Laptop, máy tính bảng (tablet), tai nghe',
  },
  {
    id: 'ban-05',
    label: 'Thiết bị điện công suất lớn (ấm siêu tốc, bếp điện...)',
    note: 'Nguy cơ cháy nổ, sập nguồn',
  },
  { id: 'ban-06', label: 'Đồ uống có cồn (rượu, bia), đồ ăn nặng mùi/nhiều nước' },
  { id: 'ban-07', label: 'Bật lửa, dao găm, thuốc lá' },
  { id: 'ban-08', label: 'Bài tây 52 lá, mọi hình thức cờ bạc' },
  { id: 'ban-09', label: 'Cấm tuyệt đối các hành vi "đi 2 về 1, đi 2 về 3"' },
];

export const BANNED_ACK_ITEMS: ChecklistItem[] = [
  {
    id: 'banned-agree',
    label: 'Tôi đã đọc và sẽ không mang theo bất kỳ thứ nào bị cấm ở trên.',
  },
];

export const SURVIVAL_TIPS = [
  'Giặt sạch quân phục ngay khi mới được phát.',
  'Dùng bút xóa/bút lông ghi rõ họ tên/tiểu đội lên tất cả đồ đạc cá nhân (mắc áo, bình nước, quân phục, mũ) để tránh mất mát.',
];

export const ENCOURAGEMENT_SLOGAN =
  'Giữ vững sự LẠC QUAN và tinh thần chịu gian, chịu khó!';

export const SLIDES: SlideMeta[] = [
  { id: 1, key: 'location', title: 'Vị Trí Tập Trung & Di Chuyển' },
  { id: 2, key: 'cost', title: 'Tra Cứu Thông Tin & Dự Toán Chi Phí' },
  { id: 3, key: 'packing', title: 'Checklist Bắt Buộc & Quân Trang' },
  { id: 4, key: 'gear', title: 'Hành Trang Khuyến Nghị' },
  { id: 5, key: 'banned', title: 'Những Thứ Bị Cấm & Không Nên Mang' },
  { id: 6, key: 'survival', title: 'Bí Kíp Sinh Tồn & Dặn Dò' },
];
