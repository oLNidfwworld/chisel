export default defineEventHandler(() => {
  return [
    {
      name: "Купить квартиру",
      links: [
        {
          name: "1-комнатные",
          link: "/realty/all-cities/buy/vtorichka/dnokomnatnye",
        },
        {
          name: "2-комнатные",
          link: "realty/all-cities/buy/vtorichka/dvuhkomnatnye",
        },
        {
          name: "3-комнатные",
          link: "/realty/all-cities/buy/vtorichka/tryohkomnatnye",
        },
        {
          name: "Комнаты в квартире",
          link: "/realty/all-cities/buy/vtorichka/komnata",
        },
      ],
    },
    {
      name: "Снять квартиру",
      links: [
        {
          name: "1-комнатные",
          link: "/realty/all-cities/rent/vtorichka/dnokomnatnye",
        },
        {
          name: "2-комнатные",
          link: "realty/all-cities/rent/vtorichka/dvuhkomnatnye",
        },
        {
          name: "3-комнатные",
          link: "/realty/all-cities/rent/vtorichka/tryohkomnatnye",
        },
        {
          name: "Комнаты в квартире",
          link: "/realty/all-cities/rent/vtorichka/komnata",
        },
      ],
    },
    {
      name: "Загородная недвижимость",
      links: [
        {
          name: "Купить дом",
          link: "/realty/all-cities/buy/zagorodnaya/house",
        },
        {
          name: "Купить земельный участок",
          link: "/realty/all-cities/buy/zagorodnaya/area/",
        },
        {
          name: "Купить дачу",
          link: "/realty/all-cities/buy/zagorodnaya/dacha/",
        }, 
      ],
    },
    {
      name: "Коммерческая недвижимость",
      links: [
        {
          name: "Офисные помещения",
          link: "/realty/all-cities/buy/zagorodnaya/house",
        },
        {
          name: "Помещения свободного назначения ",
          link: "/realty/all-cities/buy/zagorodnaya/area/",
        },
        {
          name: "Торговое помещение ",
          link: "/realty/all-cities/buy/zagorodnaya/dacha/",
        }, 
        {
          name: "Гараж и машиноместо ",
          link: "/realty/all-cities/buy/zagorodnaya/dacha/",
        }, 
        {
          name: "Земельный участок",
          link: "/realty/all-cities/buy/zagorodnaya/dacha/",
        }, 
      ],
    },
  ];
});
