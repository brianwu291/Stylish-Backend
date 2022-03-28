const { sequelize } = require("../models");

const groupCampaignProductByCampaignId = require("../utils/groupCampaignProductByCampaignId");
const mapProductValuesWithKeys = require("../utils/mapProductValuesWithKeys");

const { queryProductOption } = require("../constants/queryOptions");

const {
  CampaignProducts,
  Campaigns,
  Products,
} = sequelize.models;


const queryCampaignProductsOption = {
  attributes: {
    exclude: ["id", "createdAt", "updatedAt", "productId"],
  },
  include: [
    {
      model: Campaigns,
      required: true,
      attributes: ["title", "mainImage"],
    },
    {
      model: Products,
      required: true,
      ...queryProductOption,
    }
  ],
};


function getAllCampaigns(request, response) {
  return CampaignProducts.findAll(queryCampaignProductsOption)
    .then((allCampaignWithProducts) => {
      const campaignProducts = groupCampaignProductByCampaignId(allCampaignWithProducts);
      const campaignWithMappedProducts = campaignProducts
        .map(({ products, ...restProps }) => ({
          ...restProps,
          products: products.map(({ dataValues }) => (
            mapProductValuesWithKeys(dataValues)
          ))
        }))

      return response.status(200).send({
        data: campaignWithMappedProducts
      })
    })
    .catch((error) => {
      console.log("error", error);
      return response.status(500).send("something went wrong");
    });
}

module.exports = {
  getAllCampaigns,
};