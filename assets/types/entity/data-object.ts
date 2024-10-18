export interface DataObject {
  [index: string]:
    | {
        type: "list";
        value: Array<string>;
      }
    | {
        type: "range";
        value: {
          min?: number | undefined;
          max?: number | undefined;
        };
      };
}

export interface KeyedObject {
  [index: string]: any;
}
