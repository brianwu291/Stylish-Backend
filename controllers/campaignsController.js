const { sequelize } = require("../models");

const {
  groupCampaignProductByCampaignId
} = require("../utils/groupCampaignProductByCampaignId");
const mapProductValues = require("../utils/mapProductValues");

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

function getCampaignWithMappedProducts(allCampaignWithProducts = []) {
  return groupCampaignProductByCampaignId(allCampaignWithProducts)
    .map(({ products, ...restCampaignProps }) => ({
      ...restCampaignProps,
      products: products.map(({ dataValues }) => (
        mapProductValues(dataValues)
      ))
    }));
}


function getAllCampaigns(request, response) {
  return CampaignProducts.findAll(queryCampaignProductsOption)
    .then((allCampaignWithProducts) => (
      response.status(200).send({
        data: getCampaignWithMappedProducts(allCampaignWithProducts)
      })
    ))
    .catch((error) => {
      console.log("error", error);
      return response.status(500).send("something went wrong");
    });
}

module.exports = {
  getAllCampaigns,
};
