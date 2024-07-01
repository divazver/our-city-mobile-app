import {Dispatch, SetStateAction} from "react";

export type TagFilterProps = {
    visibleFilter: boolean,
    setVisibleFilter: Dispatch<SetStateAction<boolean>>,
    selectedTags: string[],
    setSelectedTags: Dispatch<SetStateAction<string[]>>,
    availableTags: string[]
}