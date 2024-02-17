import { FilterItemC, FilterItem } from "./filterItem.model";

export interface IStore {
  priceCalc: {
    phasesFilterData: {
      label: string;
      items: FilterItemC[];
    };
    skuFilterData: {
      label: string;
      items: FilterItem[];
    };
    deliveryComplexityFilterData: {
      label: string;
      items: FilterItem[];
    };
    tableData: any[];
    filteredTableData: any[];
  };
}
