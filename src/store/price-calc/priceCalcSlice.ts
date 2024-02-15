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
} = {
  phasesFilterData: {
    label: "In-Scope Phases",
    items: [
      { id: 0, checked: false, name: "Define" },
      { id: 1, checked: false, name: "Shape" },
      { id: 2, checked: false, name: "Build" },
      { id: 3, checked: false, name: "Scale" },
    ],
  },
  skuFilterData: {
    label: "SKUs Offered",
    items: [
      { id: 0, value: 0, name: "Mobile App Development", selected: false },
    ],
  },
  deliveryComplexityFilterData: {
    label: "Delivery Complexity",
    items: [
      { id: 0, value: 0, name: "Low", selected: false },
      { id: 1, value: 1, name: "Medium", selected: false },
      { id: 2, value: 2, name: "High", selected: false },
    ],
  },
};

export const asyncLoginThunk = createAsyncThunk(
  "priceCalc/asyncLoginThunk",
  async () => {
    return "";
  }
);

const priceCalcSlice = createSlice({
  name: "priceCalc",
  initialState: initialState,
  reducers: {
    setSkuFilterSelect: (state, { payload }: { payload: { name: string } }) => {
      state.skuFilterData.items = state.skuFilterData.items.map((item) => ({
        ...item,
        selected: item.name === payload.name,
      }));
    },
    setPhasesChecked: (
      state,
      { payload }: { payload: { id: number; isChecked: boolean } }
    ) => {
      state.phasesFilterData.items.filter(
        (item) => item.id === payload.id
      )[0].checked = payload.isChecked;
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
    resetFilters: (state) => {
      state.skuFilterData = initialState.skuFilterData;
      state.phasesFilterData = initialState.phasesFilterData;
      state.deliveryComplexityFilterData =
        initialState.deliveryComplexityFilterData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginThunk.fulfilled, (state) => {
      window.location.pathname = "/";
    });
  },
});

export const {
  setPhasesChecked,
  resetFilters,
  setSkuFilterSelect,
  setDeliveryComplexityFilterSelect,
} = priceCalcSlice.actions;
export default priceCalcSlice.reducer;
