import type { KeyedObject } from "~/assets/types/entity/data-object";

export const propsPush = (
  detailData: KeyedObject,
  arr: { name: string; value: string }[]
) => {
  if (detailData.balcony) {
    arr.push({
      name: "Балкон",
      value: detailData.balcony.toString(),
    });
  }
  if (detailData.bathroom) {
    arr.push({
      name: "Санузел",
      value: detailData.bathroom.toString(),
    });
  }
  if (detailData.elevator) {
    arr.push({
      name: "Лифт",
      value: detailData.balcony.toString(),
    });
  }
  if (detailData.floorCount && Number(detailData.floorCount)) {
    arr.push({
      name: "Этажей",
      value: detailData.floorCount.toString(),
    });
  }
  if (detailData.houseFloor) {
    arr.push({
      name: "Этаж",
      value: detailData.houseFloor.toString(),
    });
  }
  if (detailData.houseType && detailData.houseType.length > 0) {
    const isValue : Array<string> = (detailData.houseType.filter((type : any) => {
      if (type) { 
        return type;
      } else {
        return false;
      }
    }));
    if (isValue && isValue.length > 0) {
        arr.push({
          name: "Тип дома",
          value: isValue.join(", "),
        });
    }
  }
  if (detailData.ipoteka) {
    arr.push({
      name: "Ипотека",
      value: "Да",
    });
  }
  if (detailData.kitchenSquare) {
    arr.push({
      name: "Площадь кухни",
      value: `${detailData.kitchenSquare} м<sup>2</sup>`,
    });
  }
  if (detailData.livingSquare) {
    arr.push({
      name: "Жилая площадь",
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
      name: "Общая площадь",
      value: detailData.square.toString(),
    });
  }
  if (detailData.squareSec) {
    arr.push({
      name: "Площадь участка",
      value: detailData.squareSec.toString(),
    });
  }
};
