import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { string, object } from "prop-types";
import { Padding, MaxWidth } from "../Padding";
import {
  SAMPLE_ID_ELEMENT,
  ORGANISM_DETECTED,
  SAMPLE_TESTING_PROGRAM,
  ADDITIONAL,
} from "constants/dhis2";
import {
  TextInput,
  RadioInputs,
  SelectInput,
  SwitchInput,
  DateInput,
} from "@hisp-amr/inputs";
import { setEventValue, AddAndSubmit, addNotes } from "actions";
import TextField from "@material-ui/core/TextField";

import * as DUPLICACY from "constants/duplicacy";
import {
  LABTECH,
  CLINICIAN,
  PATHOGEN_DETECTED,
  RESULTS,
  NOTES,
  CLINICIAN_G,
} from "./../../../../../apps/entry/src/components/EventForm/Entity/constants";

export const DataElement = ({ id }) => {
  const dispatch = useDispatch();
  var { program, organism, sampleDate } = useSelector(
    (state) => state.data.panel
  );
  const optionSets = useSelector((state) => state.metadata.optionSets);
  const completed = useSelector((state) => state.data.event.status.completed);
  var value = useSelector((state) => state.data.event.values[id]);
  const programId = useSelector((state) => state.data.panel.program);
  const preValues = useSelector((state) => state.data.previousValues);
  const programStage = useSelector((state) => state.data.event.programStage);
  const username = useSelector((state) => state.metadata.user.username);
  var notes = useSelector((state) => state.data.notes);
  const userGroup = useSelector((state) => state.metadata.userGroup);
  var printValues = useSelector((state) => state.data.printValues);

  // if (id == "yMKFqLn9LBx") {
  //     value = value.split("-")[0]
  // }
  if (Object.keys(preValues).length && id in preValues) {
    value = preValues[id];
  }
  const color = useSelector(
    (state) => state.data.event.programStage.dataElements[id].color
  );
  var disabled = useSelector(
    (state) => state.data.event.programStage.dataElements[id].disabled
  );
  if (
    userGroup == LABTECH &&
    programStage.displayName.toLowerCase().includes(CLINICIAN)
  ) {
    disabled = true;
  }
  if (
    userGroup == CLINICIAN_G &&
    !programStage.displayName.toLowerCase().includes(CLINICIAN)
  ) {
    disabled = true;
  }
  const displayFormName = useSelector(
    (state) => state.data.event.programStage.dataElements[id].displayFormName
  );
  if (displayFormName == NOTES) {
    value = value.split("-")[0];
  }
  const error = useSelector(
    (state) => state.data.event.programStage.dataElements[id].error
  );
  const hide = useSelector(
    (state) => state.data.event.programStage.dataElements[id].hide
  );
  const optionSet = useSelector(
    (state) => state.data.event.programStage.dataElements[id].optionSet
  );

  const optionSetValue = useSelector(
    (state) => state.data.event.programStage.dataElements[id].optionSetValue
  );
  const required = useSelector(
    (state) => state.data.event.programStage.dataElements[id].required
  );
  var valueType = useSelector(
    (state) => state.data.event.programStage.dataElements[id].valueType
  );


  if (programStage.displayName.toLowerCase().includes(CLINICIAN)) {
    if (valueType == "LONG_TEXT") {
      valueType = "TEXTAREA";
    }
  }
  const numType = valueType.toUpperCase();
  const warning = useSelector(
    (state) => state.data.event.programStage.dataElements[id].warning
  );
  const eventValPassed = useSelector((state) => state.data.event.values);
  const sampleRecivedDate = useSelector(
    (state) => state.data.event.values["N2f6uoy2zqE"]
  );
  const samplecollectedDate = useSelector(
    (state) => state.data.event.values["Xxn6IK3L34r"]
  );
  const calculateDayDifference = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  };
  const updateDaysDifference = (receivedDate, collectedDate) => {
    if (receivedDate && collectedDate) {
      const daysDifference = calculateDayDifference(
        new Date(receivedDate),
        new Date(collectedDate)
      ).toString();
      dispatch(setEventValue("KRzP6XOv1mH", daysDifference, false));
    }
  };
  useEffect(() => {
    if (
      eventValPassed &&
      eventValPassed["N2f6uoy2zqE"] &&
      eventValPassed["Xxn6IK3L34r"] &&
      !eventValPassed["KRzP6XOv1mH"]
    ) {
      updateDaysDifference(sampleRecivedDate, samplecollectedDate);
     
    }
  }, [eventValPassed, sampleRecivedDate, samplecollectedDate, dispatch]);

 

  const duplicate =
    id === SAMPLE_ID_ELEMENT &&
    SAMPLE_TESTING_PROGRAM["0"].value == programId &&
    useSelector((state) => state.data.event.duplicate);
  const required1 = useSelector(
    (state) => state.data.event.programStage.dataElements["KRzP6XOv1mH"]
  );

  const onChange = (key, value, unique, label) => {
  
    if (key === "N2f6uoy2zqE" || key === "Xxn6IK3L34r") {
     
      const updatedEventValues = {
        ...eventValPassed,
        [key]: value,
      };
      const receivedDate = updatedEventValues["N2f6uoy2zqE"];
      const collectedDate = updatedEventValues["Xxn6IK3L34r"];
      updateDaysDifference(receivedDate, collectedDate);
    }
    var results = RESULTS;
    if (
      (key == ORGANISM_DETECTED && value == PATHOGEN_DETECTED) ||
      key == ADDITIONAL
    ) {
      dispatch(AddAndSubmit(true));
      dispatch(setEventValue(key, value, false));
    } else if (key == ORGANISM_DETECTED && results.indexOf(value) > -1) {
      dispatch(AddAndSubmit(false));
      dispatch(setEventValue(key, value, false));
    } else {
      var lB = label;

      if (!printValues) {
        printValues = {
          program: program,
          organism: organism,
          sampleDate: sampleDate,
          [lB]: value,
        };
      } else {
        for (var prkey in printValues) {
          if (lB == prkey) {
            printValues = { ...printValues, [lB]: value };
          } else {
            printValues = { ...printValues, [lB]: value };
          }
        }
      }
      dispatch(setEventValue(key, value, false, printValues));
    }
  };

  const handleChange = (event) => {
    if (id == "TcThq7OLuKf") {
     
      dispatch(setEventValue(id, event.target.value, false, printValues));//add code for Additonal comment
    } else dispatch(addNotes(id, event.target.value));
    // dispatch(addNotes(id, event.target.value));
    // onChange(id, event.target.value);
  };

  if (hide) return null;

  return (
    <Padding>
      {optionSetValue ? (
        optionSets[optionSet].length < 5 ? (
          <RadioInputs
            objects={optionSets[optionSet]}
            name={id}
            label={displayFormName}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled || completed}
          />
        ) : (
          <SelectInput
            objects={optionSets[optionSet]}
            name={id}
            label={displayFormName}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled || completed}
          />
        )
      ) : valueType === "TRUE_ONLY" ? (
        <SwitchInput
          name={id}
          label={displayFormName}
          checked={value}
          onChange={onChange}
          required={required}
          value={value}
          disabled={disabled || completed}
        />
      ) : valueType === "DATE" ? (
        <DateInput
          name={id}
          label={displayFormName}
          value={value}
          required={required}
          onChange={onChange}
          disabled={disabled || completed}
        />
      ) : valueType == "TEXTAREA" || valueType == "LONG_TEXT" ? (
        <TextField
          id="outlined-multiline-static"
          label={displayFormName}
          multiline
          rows={5}
          variant="outlined"
          required={required}
          name={id}
          onChange={handleChange}
          className="textArea"
          disabled={disabled || completed}
          defaultValue={value}
        />
      ) : (
        <TextInput
          name={id}
          label={displayFormName}
          value={value}
          required={required}
          onChange={onChange}
          disabled={disabled || completed}
          type={valueType}
          color={numType == "NUMBER" && value && color}
          unique={id === SAMPLE_ID_ELEMENT}
          error={
            error
              ? error
              : id === SAMPLE_ID_ELEMENT &&
                duplicate === DUPLICACY.DUPLICATE_ERROR
              ? duplicate
              : ""
          }
          warning={
            warning
              ? warning
              : id === SAMPLE_ID_ELEMENT &&
                duplicate === DUPLICACY.DUPLICATE_WARNING
              ? duplicate
              : ""
          }
          loading={
            id === SAMPLE_ID_ELEMENT &&
            duplicate === DUPLICACY.DUPLICATE_CHECKING
              ? true
              : false
          }
        />
      )}
    </Padding>
  );
};

DataElement.propTypes = {
  id: string.isRequired,
};
