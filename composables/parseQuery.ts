import type {
  DataObject,
  KeyedObject,
} from "~/assets/types/entity/data-object";

export const parseFromQuery = (queryString: {
  [index: string]: string;
}): DataObject => {
  const newObject: DataObject = {};
  Object.keys(queryString).forEach((key) => {
    if ( 
      key.includes("max") || key.includes("min") &&
       !Number.isNaN(parseInt(queryString[key]))
    ) {
      const [keyProp, ending] = key.split("_") as [string, "min" | "max"];
      if (!newObject[keyProp])
        newObject[keyProp] = {
          type: "range",
          value: {
            min: undefined,
            max: undefined,
          },
        };
      if (newObject[keyProp].type === "range")
        newObject[keyProp].value[ending] = parseInt(queryString[key]);
    } else {
      newObject[key] = {
        type: "list",
        value: queryString[key].split("-"),
      };
    }
  });
  return newObject;
};

export const parseIntoQuery = (object: DataObject): string => {
  let resultQueryString = "?";
  const objectLength = Object.keys(object).length;
  if (objectLength <= 0) return "";

  Object.keys(object).forEach((key, index) => {
    switch (object[key].type) {
      case "list":
        resultQueryString += `${key}=${object[key].value.join("-")}`;
        break;
      case "range":
        {
          let concat = "";
          if (object[key].value.min && object[key].value.max) concat = "&";
          if (object[key].value.min)
            resultQueryString += `${key}_min=${object[key].value.min}${concat}`;
          if (object[key].value.max)
            resultQueryString += `${key}_max=${object[key].value.max}`;
        }
        break;
    }
    if (objectLength - 1 > index) resultQueryString += "&";
  });
  return resultQueryString;
};

export const dataObjectToKeyObject = (object: DataObject): KeyedObject => {
  const newObject: KeyedObject = {};
  Object.keys(object).forEach((key) => {
    newObject[key] = object[key].value;
  });
  return newObject;
};
