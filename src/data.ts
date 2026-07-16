import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'Creamy black lentils simmered overnight on slow fire with rich butter and fresh cream.',
    price: 200,
    category: 'Dal Special',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD07fv5mu1IrLq8H5dkQE_WfzlmcGUpLyzINcURkWs5kJtmnh-tGQj5zRNzwOKjNrxvOzT66CjWPTSfyOrKOY4M4krMOBXoBdBz7jRgWtqR_YoynfiwccstuUKacOS05UexLU5ARR7vAt-Ks8UHXXLKRXu4I5njCoiRdiRqFPQ3ypDALRZDwLGYpVFK6s9h-W_AI_S7quDKiJKt_OQ_0z1-9SdbZd0OU6_aoDCWbpUjPA9OAl2zuhCUyG-AkfqhrsB36TolY-Js_3YT',
    rating: 4.9,
    reviewsCount: 245,
    isBestseller: true,
    isPopular: true
  },
  {
    id: 'mix-dal-dhaba',
    name: 'Mix Dal Dhaba Wali',
    description: 'Assorted lentils tempered with fried red chilies, aromatic garlic, cumin, and fresh herbs.',
    price: 180,
    category: 'Dal Special',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ0BkN8MQJWUWkYCJfxm3FxNzjg54IDPgmCzoPAexdahaPd3vZzEtQZS7wrAcMz4xSddDbU8oM0ndrT7I8GlHDEhob2r1RPUgIuvvQnUN0EzIOAUrFkoDgqrWOgoEEPpg8SGvU__VOF7DcEoEwWUWOoY3WMen-KKIh4vkqXiiqkQc929DWdndFNeuyRWwM4-nsWr2QkW32ZIeLitRI2XmwseCDsOv9UXgReVi_DyNQ69lK1jWp2wzaQYc_-aAQCEz82AGWe1fQFpzP',
    rating: 4.8,
    reviewsCount: 184,
    isPopular: true
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Cubes of fresh cottage cheese cooked in a rich, buttery tomato gravy with exotic Indian spices.',
    price: 300,
    category: 'Main Course',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-TDWqi2kTHzu9bWVZA4njOs9U-ViMG_qkRAc6B6jsDcdhswCcsE-7VbjGjbuRU-6eejqgiiRUPOX1qpcSNjsqH-nGf2WscbydrJODBu2jRrFlFSxskJiO1bibRgMyl_21KN2Om4KVy7uisjzqORw7A0yqF2P76ICvFjy4Dh2MsBFeQuBbCprR_FxvDN23m4Wqd9eNhh1cQc-eyeqInS8umdg58EHpHggvKBgJN059odORxW9nkn_Qt9ARV1HobXJoRkSHlz_dIr7r',
    rating: 4.9,
    reviewsCount: 312,
    isBestseller: true,
    isPopular: true
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    description: 'Fresh cottage cheese stir-fried with bell peppers, onions, and spicy hand-ground kadai masala.',
    price: 280,
    category: 'Main Course',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmvJLl4vIlX-WRroMuig36sQW8m-_9C5QZLAUMu3oRJqN8-wemPvsfikDwIsWjQ7MdW_XpW_aripj9qHrzQscCgbJQqPlYOFn6n3D7QvNtP4igL5A05AJ80qZOTEL6SYyMrg3DcIiDGdk5aNfbbvk18u1Gx3DOaEXMpkHNbgK9KBEc_dP6fj7U0SqyMtFhIa9ufUIFFl5ipBfGEsj1Vf8jFEVjWSMxYLM2dA5MO9JNo5BR9613UouicY5BxabtEnEz-WmfxkggCQqU',
    rating: 4.7,
    reviewsCount: 198,
    isSpicy: true
  },
  {
    id: 'malai-kofta',
    name: 'Malai Kofta',
    description: 'Soft melt-in-the-mouth paneer and potato dumplings served in a velvety sweet cashew nut gravy.',
    price: 320,
    category: 'Main Course',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNy17TeJDQYi49i-bM_An2V1O38AVVbi199nk_A87sHhbG4FhOY9Kwj-fKNDvvzojmgHZlv8vnVXSsBrJ6-hMH1RqdctqL2X1IR8VtPVG50gd3YgmaxPAQvYxejFHZS5pL4YpXumBssjn0F86uyV-chrvwUnsrVjHnJXc8AkebQiGyYK4Dkxj0LKXxPzAePUpb4_ZKtt2jxKAwaHh4doD2z50Jw_uXIeJ5l_eX9vWwz5em-2w2o4uH-Jp4w7gThovBwWBm62o6Vip8',
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: 'mix-veg',
    name: 'Mix Vegetable',
    description: 'A colorful melange of seasonal garden fresh vegetables tossed with ginger juliennes and aromatic spices.',
    price: 220,
    category: 'Main Course',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxPeHD8aZXXu9LrRWys9NxqnKOm7JGfvIKDNUWHiOaV13p55XKUNd4axr58GVgBBRyFLwEFglt3dbgmN3iHId6XjOUQGZJHIKOX9wsytk_-WlevGSy_WFG1Tc1_MkBti5VLVdFD7fn4V9ZctLZKQYhYDbsE-6z9fAOWSfAbNcSTNsl5o5LewsbtDdB_M503lC6yYVHbjHLONquIidyDnOwrK2CXD_NJLIIbUKTYXQBWA9p0M_K28UxIgHPPyUUQlqtQxXZ1z4Sig7w',
    rating: 4.6,
    reviewsCount: 110
  },
  {
    id: 'maharaja-thali',
    name: 'Maharaja Thali',
    description: 'A royal spread with 3 rich main curries, creamy Dal Makhani, Shahi Paneer, dry seasonal subzi, choice of 2 premium breads, aromatic pulao, raita, salad, papad, and a traditional sweet dessert.',
    price: 350,
    category: 'Thali',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCosobcTWXBKia0WvUP5ubM6u7z6SwaHFD12b6s3KRCOd6f1vjtK0Lu7gKv9bHt8bsVU5N6qa84ZnKgowYfjCYSwie2tlsFCckfxQnrUBaSU4gWL7KI8PAB3adNGHRx7vZR8Xe7XNg9OzbNSdHgnZW6tIe-YufuxAw2wSe5e820bra08uuCTkwzol3ud2UMeBF8H5iNrWk1ZlXwu43XC8XxXvN75Zppqd2bG0AR3FOkrt61mW18g4jVdT-1pfckEM91sNen_qCdEcS9',
    rating: 4.9,
    reviewsCount: 520,
    isPopular: true,
    isBestseller: true
  },
  {
    id: 'regular-thali',
    name: 'Regular Thali',
    description: 'Perfect wholesome daily meal. Includes 2 delicious seasonal curries, comforting home-style dal, basmati rice, refreshing raita, and 4 fluffy butter rotis.',
    price: 300,
    category: 'Thali',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0lXlrfakUUmsn__WRtDj0yDKFYCHqIoKTKPd4GDsp6wxvAZiy1AQ2GwOF5ulqg-gVQuqVA_nSGFzk0digXMHZiWdo9JRpxTkW0J1Xhsqhe9E8urYyL5PPSfAO65OGUM02184Kd80rNlXtGAJv8_wz4dhd9jL_J-XZCBgS1AmWJ0zbvPk2Z9v5deZ0ZEGV0-71BnJvCRKPr3gBb7dmHoPD8rRM9Fx0qHVLlzBAQz2CieqXzBflzC6JIEXNFEVJP1FqkX59abluzWHh',
    rating: 4.7,
    reviewsCount: 340
  },
  {
    id: 'student-thali',
    name: 'Student Thali',
    description: 'Extremely budget-friendly, highly nutritious, and filling. Comforting Dal Fry, standard seasonal dry subzi, steamed rice, 3 soft chapatis, and sliced salad. Made with care.',
    price: 199,
    category: 'Thali',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzmjEI_liZr4gtmM0f5q7JKqHgMImSbmdc4D7Men9JBGmi5liurQgDGVeLyU0xXS5FTdtkesBuStSstpJYceH7HJDTk-XZdfIoxxqkaCUuUhdW1-SA9N9yAmFzAQ5UQUr7s6gTVcsLKDwLkEdMfIwGxUXjUv9_OyhFvpkAYGQ0sTB0Hz7Ri5g3_PXWCZyaA8Rbmnfd3ysS6D4y0IVINsNrQgZs9NsalxM1wjTbEo5_ObRTMoIJhVSCl78lJZVDhneCTeTCBjzhEH9T',
    rating: 4.9,
    reviewsCount: 680,
    isPopular: true
  },
  {
    id: 'vaishnav-thali',
    name: 'Vaishnav Thali',
    description: 'Traditional pure Satvik meal prepared entirely without onion and garlic. Includes golden Moong Dal, comforting Kadhi, steamed rice, 2 dry satvik subzis, and 4 soft phulka rotis.',
    price: 250,
    category: 'Thali',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmNE6fI_7Ki5fRfL9sdFa8HD7BLBgn1nKqrzGoSBN6B1UrDiHN1wgmhGruKwDNOGU6geZLNARapinj-aujxvmMr5yaUUCIdAowHBc84hmeO2b4ffTFV8m4rvCzNYOYz89Xvx2yxi3F2MWVCsoqc1TkHv4QpDMltISogz_J9wWW5SPeveZM34RUHeMASzBrfubKQ9Ys62vN0Wp4eltZ-1lh594H4Fmp4VkYpJFWzFWjn2MEP9_Q73dXFXEX27dq4bWpKyJjG48LUbXT',
    rating: 4.8,
    reviewsCount: 225,
    isSatvik: true
  },
  {
    id: 'grand-dhaba-thali',
    name: 'The Grand Dhaba Thali',
    description: 'Experience a complete journey of flavors with our signature Thali. Includes 2 Main Veg, 1 Dal, Rice, 2 Roti, Raita, Salad, Pickle, and a seasonal Dessert.',
    price: 350,
    category: 'Thali',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1yZFJYkxZ0mPTISuRPF1Oq-umogFHPx6NtSzIj0BZ74BaJX4A7ymXuy4U_UVR5Mn_vmRT8Uq7YBF-N_-IfoaY9NRkQ1VTJQqGE0nDBmTWMrf_hLy3_Wk4MdtgO9DXsVHOZNOZibDMedZQ4HB6LenFIIe4T8SR11hWTjxC_zaPh81WOMUQFhckyAcBg49TvH1UmSD8vdcYAbggYd9nPJFxfExXEceEYoqZpQIoMQIMnnfIQjsfBywKt6QgfEGoZqs7O0eRINy8LSsu',
    rating: 4.9,
    reviewsCount: 420,
    isPopular: true
  },
  {
    id: 'butter-naan',
    name: 'Butter Naan',
    description: 'Soft, fluffy tandoor-baked leavened flatbread glazed with premium fresh white butter.',
    price: 50,
    category: 'Roti/Naan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgBliNNCdz-_8tfTicGqL5mamz8fe8cAWLw7lf_eGl4xGyXmYmcFMg_a7WXHXUtCatCB41sVooc8bELli6KBoFnmUMfXVCFHdPqzx06Tu7Mf0dEdLPzK1JIrJE0mdQEDwEGKTvwanqZxYE7-rS4W2u_HTZuFvI6py_hsspNoN-kSY5cmO9mvf2cc_xOP3tY6g6tX9BiZVEJul9kBV3mG9-eN1TyyyMv50ZQv-q0_4WHdUGKTKy7TsVJ28QOZ0O54WK4jzxa7jE5wbx',
    rating: 4.8,
    reviewsCount: 490
  },
  {
    id: 'tandoori-roti',
    name: 'Tandoori Roti',
    description: 'Crispy whole wheat flatbread traditional baked on the inner walls of a clay tandoor oven.',
    price: 20,
    category: 'Roti/Naan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgBliNNCdz-_8tfTicGqL5mamz8fe8cAWLw7lf_eGl4xGyXmYmcFMg_a7WXHXUtCatCB41sVooc8bELli6KBoFnmUMfXVCFHdPqzx06Tu7Mf0dEdLPzK1JIrJE0mdQEDwEGKTvwanqZxYE7-rS4W2u_HTZuFvI6py_hsspNoN-kSY5cmO9mvf2cc_xOP3tY6g6tX9BiZVEJul9kBV3mG9-eN1TyyyMv50ZQv-q0_4WHdUGKTKy7TsVJ28QOZ0O54WK4jzxa7jE5wbx',
    rating: 4.7,
    reviewsCount: 310
  },
  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    description: 'Leavened flatbread heavily infused with finely chopped roasted garlic and fresh coriander leaves, brushed with butter.',
    price: 70,
    category: 'Roti/Naan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgBliNNCdz-_8tfTicGqL5mamz8fe8cAWLw7lf_eGl4xGyXmYmcFMg_a7WXHXUtCatCB41sVooc8bELli6KBoFnmUMfXVCFHdPqzx06Tu7Mf0dEdLPzK1JIrJE0mdQEDwEGKTvwanqZxYE7-rS4W2u_HTZuFvI6py_hsspNoN-kSY5cmO9mvf2cc_xOP3tY6g6tX9BiZVEJul9kBV3mG9-eN1TyyyMv50ZQv-q0_4WHdUGKTKy7TsVJ28QOZ0O54WK4jzxa7jE5wbx',
    rating: 4.9,
    reviewsCount: 560
  },
  {
    id: 'veg-biryani',
    name: 'Shahi Veg Biryani',
    description: 'Fragrant basmati rice layered with slow-cooked spiced seasonal vegetables, saffron, and aromatic spices. Served with raita.',
    price: 240,
    category: 'Rice & Biryani',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYPDji-KfQ_huTug3f3qJtaz1Uf_xf7A2EnrFOHKFcrWyuxyK_WQwJ1iFE9AQW88nD83DA92iQMdR_mx5QFiyt0N3Z9C-cQ6y0R4tqZ-NLrnfp1BQP4w1-ggT9Lep_K4RrOGJwKM0ZSV3IBwhGpcZbWPRAO5fjkKkMvaB0l-doJTdIb38bElm35oCKgWOhOmWHOcOZ7Hm_-oyuaHWQa-QZ0RaCWe0ApctEfn7uSZfzSPvrwN6tKNNv9EDvec2Kauh456JY8JxsuP1k',
    rating: 4.8,
    reviewsCount: 180
  },
  {
    id: 'jeera-rice',
    name: 'Jeera Rice',
    description: 'Fluffy steamed basmati rice tempered with aromatic cumin seeds and roasted spices.',
    price: 140,
    category: 'Rice & Biryani',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYPDji-KfQ_huTug3f3qJtaz1Uf_xf7A2EnrFOHKFcrWyuxyK_WQwJ1iFE9AQW88nD83DA92iQMdR_mx5QFiyt0N3Z9C-cQ6y0R4tqZ-NLrnfp1BQP4w1-ggT9Lep_K4RrOGJwKM0ZSV3IBwhGpcZbWPRAO5fjkKkMvaB0l-doJTdIb38bElm35oCKgWOhOmWHOcOZ7Hm_-oyuaHWQa-QZ0RaCWe0ApctEfn7uSZfzSPvrwN6tKNNv9EDvec2Kauh456JY8JxsuP1k',
    rating: 4.6,
    reviewsCount: 95
  },
  {
    id: 'mix-pakoda',
    name: 'Mix Veg Pakoda',
    description: 'Crispy gram-flour battered deep-fried fritters made with onions, potatoes, spinach, and hot green chilies. Served with mint chutney.',
    price: 120,
    category: 'Snacks/Pakoda',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxPeHD8aZXXu9LrRWys9NxqnKOm7JGfvIKDNUWHiOaV13p55XKUNd4axr58GVgBBRyFLwEFglt3dbgmN3iHId6XjOUQGZJHIKOX9wsytk_-WlevGSy_WFG1Tc1_MkBti5VLVdFD7fn4V9ZctLZKQYhYDbsE-6z9fAOWSfAbNcSTNsl5o5LewsbtDdB_M503lC6yYVHbjHLONquIidyDnOwrK2CXD_NJLIIbUKTYXQBWA9p0M_K28UxIgHPPyUUQlqtQxXZ1z4Sig7w',
    rating: 4.7,
    reviewsCount: 142
  },
  {
    id: 'sweet-lassi',
    name: 'Sweet Lassi',
    description: 'Traditional yogurt-based sweet, thick, and ultra-creamy drink, served chilled with cardamom flavor.',
    price: 60,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/4475024/pexels-photo-4475024.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviewsCount: 390
  },
  {
    id: 'masala-tea',
    name: 'Masala Tea',
    description: 'Refreshing highway style milk tea brewed with fresh ginger root, crushed cardamom, and black tea leaves.',
    price: 30,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/20270270/pexels-photo-20270270.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviewsCount: 450
  },
  {
    id: 'mineral-water',
    name: 'Mineral Water',
    description: 'Purified, packaged premium drinking water served chilled.',
    price: 20,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/8611290/pexels-photo-8611290.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviewsCount: 120
  },
  {
    id: 'cold-drinks',
    name: 'Cold Drinks',
    description: 'Bottled carbonated soft drinks served ice cold.',
    price: 40,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/4045205/pexels-photo-4045205.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviewsCount: 220
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Amit Kumar',
    role: 'Local Guide',
    initials: 'AK',
    rating: 5,
    review: "The best Dal Makhani I've had in years! It truly tastes like home. The Maharaja Thali is a must-try for anyone who wants a complete feast.",
    bgTheme: 'bg-[#ffdbd1]/30 text-primary'
  },
  {
    id: 'test-2',
    name: 'Priya Sharma',
    role: 'Student',
    initials: 'PS',
    rating: 5,
    review: "Student thali is a lifesaver. Affordable, clean, and healthy. I've been eating here for months and never had a single complaint about quality.",
    bgTheme: 'bg-[#ffdf95]/30 text-secondary'
  },
  {
    id: 'test-3',
    name: 'Rahul Verma',
    role: 'Resident',
    initials: 'RV',
    rating: 5,
    review: "Super fast delivery to Sanskriti. The food arrived piping hot. The packing was excellent too. Highly recommend their Shahi Paneer!",
    bgTheme: 'bg-[#9af6b8]/30 text-tertiary'
  }
];
