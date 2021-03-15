import React from "react";
import { NativeSelect } from "@material-ui/core";
import { locales } from "./localization/locales";

export const LocalePicker = ({currentLocale,onLocalChange}) => {
    const handleChange = event =>{
        localStorage.setItem('locale',event.target.value)
        onLocalChange(event.target.value)
    }
  return (
    <NativeSelect 
    value = {currentLocale}
    onChange = {handleChange}
    id="demo-controlled-open-select" name="genre">
      <option value={locales.EN}>
    EN
      </option>
      <option value={locales.RU}>
       RU
      </option>
    </NativeSelect>
  );
};
