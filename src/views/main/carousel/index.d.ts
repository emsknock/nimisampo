import { FC } from "react";

interface CarouselProps {
    
    list: string[],
    checkedItems: string[],
    onChangeItem: (item: string, isChecked: boolean) => void,

    page: number,
    onChangePage: (newPage: number) => void,
    itemsPerPage?: number,

}

export const Carousel: FC<CarouselProps>;