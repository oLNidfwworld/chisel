import type { ObjectDetail } from "../entity/object-detail";

export default interface Detail {
    item: ObjectDetail,
    similarItems : ObjectDetail[]
}