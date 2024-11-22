import type { KeyedObject } from "~/assets/types/entity/data-object";

export const propsPush = (
  detailData: KeyedObject,
  arr: { name: string; value: string }[]
) => {
  if (detailData.balcony) {
    arr.push({
      name: "Балкон / Лоджия",
      value: detailData.balcony.toString(),
    });
  }
  if (detailData.bathroom) {
    arr.push({
      name: "Санузел",
      value: detailData.bathroom.toString(),
    });
  }
  if (detailData.elevator && detailData.section !== "commerce") {
    arr.push({
      name: "Лифт",
      value: detailData.elevator.toString(),
    });
  }
  if (
    detailData.section !== "commerce" &&
    detailData.floorCount &&
    Number(detailData.floorCount) &&
    detailData.houseFloor
  ) {
    arr.push({
      name: "Этаж",
      value:
        detailData.houseFloor.toString() +
        " из " +
        detailData.floorCount.toString(),
    });
  }
  if (detailData.houseType && detailData.houseType.length > 0) {
    const isValue: Array<string> = detailData.houseType.filter((type: any) => {
      if (type) {
        return type;
      } else {
        return false;
      }
    });
    if (isValue && isValue.length > 0) {
      arr.push({
        name: "Тип дома",
        value: isValue.join(", "),
      });
    }
  }
  // if (detailData.ipoteka) {
  //   arr.push({
  //     name: "Ипотека",
  //     value: "Да",
  //   });
  // }
  if (detailData.kitchenSquare) {
    arr.push({
      name: "Пл. кухни",
      value: `${detailData.kitchenSquare} м<sup>2</sup>`,
    });
  }
  if (detailData.livingSquare) {
    arr.push({
      name: "Жилая пл.",
      value: `${detailData.livingSquare} м<sup>2</sup>`,
    });
  }
  if (detailData.roomsCount) {
    arr.push({
      name: "Комнат",
      value: detailData.roomsCount.toString(),
    });
  }
  if (detailData.square && detailData.square !== "0.00") {
    arr.push({
      name: detailData.section !== "zagorodnaya" ? "Общ. пл." : "Пл. дома",
      value: `${detailData.square.toString()} м<sup>2</sup>`,
    });
  }
  if (detailData.squareSec) {
    arr.push({
      name: "Пл. участка",
      value: `${detailData.squareSec.toString()} сот`,
    });
  }

  if (detailData.communications && Array.isArray(detailData.communications)) {
    arr.push(
      ...detailData.communications.map((communication: { name: string }) => {
        return {
          name: communication.name,
          value: "Да",
        };
      })
    );
  }

  sortBySection(detailData, arr);
};

const sortBySection = (
  detailData: KeyedObject,
  arr: { name: string; value: string }[]
) => {
  switch (detailData.section) {
    case "vtorichka":
      {
        const sortOrder = [
          "Комнат",
          "Общ. пл.",
          "Жилая пл.",
          "Пл. кухни",
          "Этаж",
          "Балкон / Лоджия",
          "Тип дома",
          "Санузел",
          "Ипотека",
          "Лифт",
        ];
        arr.sort(
          (a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name)
        );
      }
      break;
    case "zagorodnaya":
      {
        const sortOrder = [
          "Пл. дома",
          "Пл. участка",
          "Тип дома",
          "Комнат",
          "Газ",
          "Электричество",
          "Вода",
          "Канализация",
          "Отопление",
        ];
        arr.sort(
          (a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name)
        );
      }
      break;
    case "commerce":
      break;
  }
};
