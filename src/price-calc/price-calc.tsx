import { useSelector } from "react-redux";
import ClickButton from "../components/common/buttons/clickButton/clickButton";
import Filter from "../components/common/inputs/filter/filter";
import MultiSelect from "../components/common/inputs/multiSelect/multi-select";
import "./priceCalc.scss";
import { IStore } from "../models/store.model";
import {
  fetchAsyncTableData,
  resetFilters,
  setDeliveryComplexityFilterSelect,
  setFilteredData,
  setPhasesChecked,
  setSkuFilterSelect,
} from "../store/price-calc/priceCalcSlice";
import DataTable from "../components/common/table/table";
import { useAppDispatch } from "../store/useDispatch";
import { useEffect, useState } from "react";

const PriceCalc = () => {
  const [skuFilterVal, setSkuFilterVal] = useState("");
  const [phasesFilterVal, setPhasesFilterVal] = useState<Array<string>>([]);
  const [complexityFilterVal, setComplexityFilterVal] = useState("");
  const {
    skuFilterData,
    phasesFilterData,
    deliveryComplexityFilterData,
    filteredTableData,
  } = useSelector((store: IStore) => store.priceCalc);
  const dispatch = useAppDispatch();

  // Fetching data
  useEffect(() => {
    dispatch(fetchAsyncTableData());
  }, [dispatch]);

  useEffect(() => {
    const selected = skuFilterData.items.filter((item) => item.selected);
    setSkuFilterVal(selected.length ? selected[0].name : "");
  }, [skuFilterData]);

  useEffect(() => {
    const selected = phasesFilterData.items.filter((item) => item.checked);
    setPhasesFilterVal(selected.map((item) => item.name));
  }, [phasesFilterData]);

  useEffect(() => {
    const selected = deliveryComplexityFilterData.items.filter(
      (item) => item.selected
    );
    setComplexityFilterVal(selected.length ? selected[0].name : "");
  }, [deliveryComplexityFilterData]);

  const onProceed = () => {
    dispatch(
      setFilteredData({
        skuFilterVal: skuFilterVal,
        phasesFilterVal: phasesFilterVal,
        complexityFilterVal: complexityFilterVal,
      })
    );
  };

  return (
    <div className="mainContainer">
      <div className="tabs">
        <ClickButton
          text="Price Calculate"
          handleClick={() => {}}
          disabled={false}
        />
        <ClickButton
          text="Efforts Split"
          handleClick={() => {}}
          disabled={true}
        />
      </div>
      <div className="filters">
        <Filter
          data={skuFilterData}
          setChoice={(val: string) =>
            dispatch(setSkuFilterSelect({ name: val }))
          }
        />
        <MultiSelect
          data={phasesFilterData}
          setChecked={(ind: number, val: boolean) =>
            dispatch(setPhasesChecked({ id: ind, isChecked: val }))
          }
          disabled={skuFilterVal === ""}
        />
        <Filter
          data={deliveryComplexityFilterData}
          setChoice={(val: string) =>
            dispatch(setDeliveryComplexityFilterSelect({ name: val }))
          }
          disabled={phasesFilterVal.length === 0}
        />
      </div>
      <div className="actionBtns">
        <ClickButton
          text="Clear All"
          handleClick={() => dispatch(resetFilters())}
          disabled={false}
        />
        <ClickButton
          text="Proceed"
          handleClick={onProceed}
          disabled={complexityFilterVal === ""}
        />
      </div>
      {filteredTableData?.length ? (
        <div className="table">
          <DataTable rows={filteredTableData} />
        </div>
      ) : null}
    </div>
  );
};

export default PriceCalc;
