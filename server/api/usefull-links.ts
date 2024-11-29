import { $fetchApi } from "~/composables/api";

export default defineEventHandler(async () => {
  const links = [
    {
      name: "Купить квартиру",
      links: [
        {
          name: "1-комнатные",
          link: "/realty/all-cities/buy/vtorichka/dnokomnatnye",
          count: 0,
          postData: {
            objectRealty: "dnokomnatnye",
            section: "vtorichka",
            typeOffer: "buy",
          },
        },
        {
          name: "2-комнатные",
          link: "/realty/all-cities/buy/vtorichka/dvuhkomnatnye",
          count: 0,
          postData: {
            objectRealty: "dvuhkomnatnye",
            section: "vtorichka",
            typeOffer: "buy",
          },
        },
        {
          name: "3-комнатные",
          link: "/realty/all-cities/buy/vtorichka/tryohkomnatnye",
          count: 0,
          postData: {
            objectRealty: "tryohkomnatnye",
            section: "vtorichka",
            typeOffer: "buy",
          },
        },
        {
          name: "Комнаты в квартире",
          link: "/realty/all-cities/buy/vtorichka/komnata",
          count: 0,
          postData: {
            objectRealty: "komnata",
            section: "vtorichka",
            typeOffer: "buy",
          },
        },
      ],
    },
    {
      name: "Снять квартиру",
      links: [
        {
          name: "1-комнатные",
          link: "/realty/all-cities/rent/vtorichka/dnokomnatnye",
          count: 0,
          postData: {
            objectRealty: "dnokomnatnye",
            section: "vtorichka",
            typeOffer: "rent",
          },
        },
        {
          name: "2-комнатные",
          link: "/realty/all-cities/rent/vtorichka/dvuhkomnatnye",
          count: 0,
          postData: {
            objectRealty: "dvuhkomnatnye",
            section: "vtorichka",
            typeOffer: "rent",
          },
        },
        {
          name: "3-комнатные",
          link: "/realty/all-cities/rent/vtorichka/tryohkomnatnye",
          count: 0,
          postData: {
            objectRealty: "tryohkomnatnye",
            section: "vtorichka",
            typeOffer: "rent",
          },
        },
        {
          name: "Комнаты в квартире",
          link: "/realty/all-cities/rent/vtorichka/komnata",
          count: 0,
          postData: {
            objectRealty: "komnata",
            section: "vtorichka",
            typeOffer: "rent",
          },
        },
      ],
    },
    {
      name: "Загородная недвижимость",
      links: [
        {
          name: "Купить дом",
          link: "/realty/all-cities/buy/zagorodnaya/house",
          count: 0,
          postData: {
            objectRealty: "house",
            section: "zagorodnaya",
            typeOffer: "buy",
          },
        },
        {
          name: "Купить земельный участок",
          link: "/realty/all-cities/buy/zagorodnaya/area/",
          count: 0,
          postData: {
            objectRealty: "area",
            section: "zagorodnaya",
            typeOffer: "buy",
          },
        },
        {
          name: "Купить дачу",
          link: "/realty/all-cities/buy/zagorodnaya/dacha/",
          count: 0,
          postData: {
            objectRealty: "dacha",
            section: "zagorodnaya",
            typeOffer: "buy",
          },
        },
      ],
    },
    {
      name: "Коммерческая недвижимость",
      links: [
        {
          name: "Офисные помещения",
          link: "/realty/all-cities/buy/commerce/office",
          count: 0,
          postData: {
            objectRealty: "office",
            section: "commerce",
            typeOffer: "buy",
          },
        },
        {
          name: "Помещения свободного назначения ",
          link: "/realty/all-cities/buy/commerce/any_goal_room",
          count: 0,
          postData: {
            objectRealty: "any_goal_room",
            section: "commerce",
            typeOffer: "buy",
          },
        },
        {
          name: "Торговое помещение ",
          link: "/realty/all-cities/buy/commerce/trade_space",
          count: 0,
          postData: {
            objectRealty: "trade_space",
            section: "commerce",
            typeOffer: "buy",
          },
        },
        {
          name: "Гараж и машиноместо ",
          link: "/realty/all-cities/buy/commerce/garage/",
          count: 0,
          postData: {
            objectRealty: "garage",
            section: "commerce",
            typeOffer: "buy",
          },
        },
        {
          name: "Земельный участок",
          link: "/realty/all-cities/buy/commerce/area/",
          count: 0,
          postData: {
            objectRealty: "area",
            section: "commerce",
            typeOffer: "buy",
          },
        },
      ],
    },
  ];

  const countData = await $fetchApi<{ [i: string]: number }>(
    `/CatalogCountMultiply/`,
    {
      query: {
        urlData: JSON.stringify(
          links.flatMap((item) =>
            item.links.map((link) => link.link.replace("/realty", ""))
          )
        ),
      },
    }
  );
  const flatMapLinks = links.flatMap((x) => x.links);
  Object.keys(countData).forEach((key) => {
    const findedLink = flatMapLinks.find((link) => link.link === key);
    if (findedLink) {
      findedLink.count = countData[key] as number;
    }
  });

  return {
    links: links,
    countData,
  };
});
