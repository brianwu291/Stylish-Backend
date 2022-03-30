const isUndefined = require("lodash/isUndefined");

const typeErrorMessage = "campaignProducts should be an array";

function groupCampaignProductByCampaignId(campaignProducts) {
  if (!Array.isArray(campaignProducts)) {
    return new Error(typeErrorMessage);
  }

  return campaignProducts.reduce(
    (
      { groupByMap, finalResult },
      { campaignId, Campaign, Product }
    ) => {
      if (isUndefined(groupByMap[campaignId])) {
        groupByMap[campaignId] = campaignId;
        finalResult.push({
          id: campaignId,
          picture: Campaign.mainImage,
          story: Campaign.title,
          products: [Product],
        })
        return ({ groupByMap, finalResult });
      }

      const targetCampaignIndex = finalResult.findIndex(({ id }) => id === campaignId);
      finalResult[targetCampaignIndex].products.push(Product);

      return ({ groupByMap, finalResult });
    },
    {
      groupByMap: {},
      finalResult: []
    }
  ).finalResult;
}

module.exports = {
  typeErrorMessage,
  groupCampaignProductByCampaignId,
}
