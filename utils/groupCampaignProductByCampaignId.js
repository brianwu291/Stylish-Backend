const isUndefined = require("lodash/isUndefined");


function groupCampaignProductByCampaignId(campaignProducts = []) {
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

module.exports = groupCampaignProductByCampaignId;
