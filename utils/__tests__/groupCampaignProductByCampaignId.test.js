const {
  typeErrorMessage,
  groupCampaignProductByCampaignId,
} = require("../groupCampaignProductByCampaignId");

describe("Should return error when input type is not array", () => {
  const TypeError = new Error(typeErrorMessage);
  it.each`
    input             | expectedResult
    ${undefined}      | ${TypeError}
    ${null}           | ${TypeError}
    ${{}}             | ${TypeError}
    ${12}             | ${TypeError}
    ${''}             | ${TypeError}
    ${[]}             | ${[]}
  `('if input: $input, then return $expectedResult', ({ input, expectedResult }) => {
    const result = groupCampaignProductByCampaignId(input);
    expect(result).toEqual(expectedResult);
  });
});

it('should return expected group campaign products', () => {
  const originalInventories = [{}];
  const originalImages = [''];

  const campaignOneId = 1;
  const campaignOneTitle = '於是\r\n我也想要給你\r\n一個那麼美好的自己。\r\n不朽《與自己和好如初》';
  const campaignOneMainImage = 'https://api.appworks-school.tw/assets/201807242228/keyvisual.jpg';
  const productOne = {
    id: 1,
    category: 'men',
    title: '厚實毛呢格子外套',
    description: '高抗寒素材選用，保暖也時尚有型',
    price: 2200,
    texture: '棉、聚脂纖維',
    wash: '手洗（水溫40度',
    place: '韓國',
    note: '實品顏色以單品照為主',
    story: '你絕對不能錯過的超值商品',
    mainImage: 'https://api.appworks-school.tw/assets/201807201824/main.jpg',
    Inventories: originalInventories,
    Images: originalImages
  };

  const campaignThreeId = 3;
  const campaignThreeTitle = '瞬間\r\n在城市的角落\r\n找到失落多時的記憶。\r\n印象《都會故事集》';
  const campaignThreeMainImage = 'https://api.appworks-school.tw/assets/201807202140/keyvisual.jpg';
  const productTwo = {
    id: 2,
    category: 'women',
    title: '透肌澎澎防曬襯衫',
    description: '厚薄：薄\\r\\n彈性：無',
    price: 599,
    texture: '棉 100%',
    wash: '手洗、溫水',
    place: '中國',
    note: '實品顏色以單品照為主',
    story: 'O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.',
    mainImage: 'https://api.appworks-school.tw/assets/201807202140/main.jpg',
    Inventories: originalInventories,
    Images: originalImages
  };

  const originalCampaignProduct = [
    {
      campaignId: campaignOneId,
      Campaign: {
        title: campaignOneTitle,
        mainImage: campaignOneMainImage,
      },
      Product: productOne,
    },
    {
      campaignId: campaignThreeId,
      Campaign: {
        title: campaignThreeTitle,
        mainImage: campaignThreeMainImage,
      },
      Product: productTwo,
    },
    {
      campaignId: campaignOneId,
      Campaign: {
        title: campaignOneTitle,
        mainImage: campaignOneMainImage,
      },
      Product: productTwo,
    },
  ];

  const campaignProductByCampaignId = groupCampaignProductByCampaignId(originalCampaignProduct);

  const expectedReturn = [
    {
      id: campaignOneId,
      picture: campaignOneMainImage,
      story: campaignOneTitle,
      products: [productOne, productTwo]
    },
    {
      id: campaignThreeId,
      picture: campaignThreeMainImage,
      story: campaignThreeTitle,
      products: [productTwo]
    }
  ]

  expect(campaignProductByCampaignId).toEqual(expectedReturn);
});


