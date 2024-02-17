import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterItem, FilterItemC } from "../../models/filterItem.model";

const initialState: {
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
  tableData: any;
  filteredTableData: any[];
} = {
  phasesFilterData: {
    label: "In-Scope Phases",
    items: [],
  },
  skuFilterData: {
    label: "SKUs Offered",
    items: [],
  },
  deliveryComplexityFilterData: {
    label: "Delivery Complexity",
    items: [],
  },
  tableData: {},
  filteredTableData: [],
};

export const fetchAsyncTableData = createAsyncThunk(
  "priceCalc/fetchAsyncTableData",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("data.json")
        .then((res) => res.json())
        .then((res) => res);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error });
    }
  }
);

function uniqueArray(arr: any[]): any[] {
  const uniqueArr: any[] = [];
  for (const item of arr) {
    if (!uniqueArr.includes(item)) {
      uniqueArr.push(item);
    }
  }
  return uniqueArr;
}

const priceCalcSlice = createSlice({
  name: "priceCalc",
  initialState: initialState,
  reducers: {
    setSkuFilterSelect: (state, { payload }: { payload: { name: string } }) => {
      state.skuFilterData.items = state.skuFilterData.items.map((item) => ({
        ...item,
        selected: item.name === payload.name,
      }));
      const phases = state.tableData[payload.name].data.map(
        (item: any) => item.inScopePhases
      );
      state.phasesFilterData.items = uniqueArray(phases).map(
        (item: any, ind: number) => ({
          id: ind,
          checked: false,
          name: item,
        })
      );
    },
    setPhasesChecked: (
      state,
      { payload }: { payload: { id: number; isChecked: boolean } }
    ) => {
      state.phasesFilterData.items.filter(
        (item) => item.id === payload.id
      )[0].checked = payload.isChecked;
      const selectedSku = state.skuFilterData.items.filter(
        (item) => item.selected
      )[0].name;
      const phases = state.phasesFilterData.items
        .filter((item) => item.checked)
        .map((item) => item.name);
      const complexity = state.tableData[selectedSku].data
        .filter((item: any) => phases.includes(item.inScopePhases))
        .map((item: any) => item.deliveryVelocity);
      state.deliveryComplexityFilterData.items = uniqueArray(complexity).map(
        (item, ind) => ({
          id: ind,
          value: ind,
          name: item,
          selected: false,
        })
      );
    },
    setDeliveryComplexityFilterSelect: (
      state,
      { payload }: { payload: { name: string } }
    ) => {
      state.deliveryComplexityFilterData.items =
        state.deliveryComplexityFilterData.items.map((item) => ({
          ...item,
          selected: item.name === payload.name,
        }));
    },
    setFilteredData: (
      state,
      action: {
        payload: {
          skuFilterVal: string;
          phasesFilterVal: Array<string>;
          complexityFilterVal: string;
        };
      }
    ) => {
      state.filteredTableData = state.tableData[
        action.payload.skuFilterVal
      ].data
        .filter((item: any) =>
          action.payload.phasesFilterVal.includes(item.inScopePhases)
        )
        .filter(
          (item: any) =>
            item.deliveryVelocity === action.payload.complexityFilterVal
        );
      state.filteredTableData[0].skuOfferings = action.payload.skuFilterVal;
    },
    resetFilters: (state) => {
      state.skuFilterData = initialState.skuFilterData;
      state.phasesFilterData = initialState.phasesFilterData;
      state.deliveryComplexityFilterData =
        initialState.deliveryComplexityFilterData;
      state.tableData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTableData.fulfilled, (state, { payload }) => {
      state.tableData = payload;
      state.skuFilterData.items = Object.keys(payload).map(
        (key: string, ind: number) => ({
          id: ind,
          value: ind,
          name: key,
          selected: false,
        })
      );
    });
    builder.addCase(fetchAsyncTableData.rejected, (state, error) => {
      console.log("Error while fetching table data", error);
      state.tableData = [];
      state.filteredTableData = [];
    });
  },
});

export const {
  setPhasesChecked,
  resetFilters,
  setSkuFilterSelect,
  setDeliveryComplexityFilterSelect,
  setFilteredData,
} = priceCalcSlice.actions;
export default priceCalcSlice.reducer;
