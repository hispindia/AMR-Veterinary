import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setEntityValue, validateUnique } from '@hisp-amr/app'
import { TextInput, AgeInput, RadioInputs, SelectInput } from '@hisp-amr/inputs'
import {TreeViewInput} from './TreeViewInput'


const Padding = styled.div`
    padding: 16px;
`

const generateUniqueKey = (prefix) => {// generate unique key function 
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const randomDigits = String(Math.floor(Math.random() * 1000)).padStart(3, '0'); // Random 3 digits
    return `${prefix}${year}${month}${day}${randomDigits}`;
};
/**
 * Entity information section.
 */
export const EntityInput = ({ attribute,userAccess }) => {
    const dispatch = useDispatch()
    const { optionSets } = useSelector(state => state.metadata)
    const { id: entityId, editing } = useSelector(state => state.data.entity)
    const id = attribute.trackedEntityAttribute.id
   
    const value = useSelector(state => state.data.entity.values[id])
    const unique = useSelector(state => state.data.entity.uniques[id])
    const modal = useSelector(state => state.data.entity.modal)
    const disabled = entityId && !editing ? true : false
    const valueType = attribute.trackedEntityAttribute.valueType;
    const displayLabel = attribute.trackedEntityAttribute.formName ? attribute.trackedEntityAttribute.formName : attribute.trackedEntityAttribute.displayName
    var { orgUnits } = useSelector(state => state.metadata)
    let { allOrg } = useSelector(state => state.metadata)
    const patientType = useSelector((state) => state.data.entity.values['YGv8uqmcwne']); // Patient Type ID
    const uniques = useSelector(state => state.data.entity.uniques)
   
    
    var valueToFind = "";
    function newOrgInsert(testorgs)
    {
    var testorgss = testorgs
    var isParent = false;
    if(Array.isArray(testorgs)){
    testorgss = testorgs[0]
    }
    else{
        testorgss = testorgs
    }
    if(testorgss && isParent == false){
        testorgss['label'] = testorgss.displayName;
        testorgss['value'] = testorgss.id;
        if (testorgss.id == value) {
            valueToFind = testorgss.displayName
        }
    isParent = true;
    }
    if(testorgss.children.length!=0){
        testorgss.children.forEach(function(element){
            element['label'] = element.displayName
            element['value'] = element.id
            if (element.id == value) {
                valueToFind = element.displayName;
            }
        newOrgInsert(element)
        })
    }
    return testorgss
    }
    var orgUnitsLabels = {}
    if (valueType === "ORGANISATION_UNIT") {
        orgUnitsLabels = newOrgInsert(allOrg)
    }
    /**
     * Called on every input field change.
     */
   
    const onChange = (n, v) => {
        if (n === 'ydf3KzRSDQd' && attribute.trackedEntityAttribute.valueType === 'TEXT') {
            // Generate unique key based on Patient Type
            const prefix = patientType === 'Human' ? 'HU' : 'AN';
            v = generateUniqueKey(prefix);//call unique key function 
        }
        if (v !== value) dispatch(setEntityValue(n, v));//default code 
         
    };
   

    /**
     * Checks if unique value is valid.
     * @param {string} id - Attribute ID.
     * @param {string} value - Attribute value.
     * @param {string} label - Attribute label.
     */

    // useEffect(()=>{
    //     setAttributesUpdate(attribute)
    // },[])

    useEffect(() => {
        if (patientType && id === 'ydf3KzRSDQd') {
            const prefix = patientType === 'Human' ? 'HU' : 'AN';
            const uniqueId = generateUniqueKey(prefix);
            dispatch(setEntityValue('ydf3KzRSDQd', uniqueId));//set the unique id value to this attribute
        }
    }, [patientType, id, dispatch]);
   
    
    const onValidation = async (name, value, label) =>
        await dispatch(validateUnique(name, value, label))
   
    return (
        <Padding>
            {attribute?.trackedEntityAttribute?.valueType === 'AGE' ? (
                <AgeInput
                    required={attribute?.mandatory}
                    unique={attribute?.trackedEntityAttribute?.unique}
                    name={attribute?.trackedEntityAttribute?.id}
                    label={displayLabel}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            ) : attribute?.trackedEntityAttribute?.optionSetValue ? (
                optionSets[attribute?.trackedEntityAttribute?.optionSet?.id]
                    .length == 2 ? (
                    <RadioInputs
                        required={attribute?.mandatory}
                        objects={
                            optionSets[
                                attribute?.trackedEntityAttribute?.optionSet?.id
                            ]
                        }
                        name={attribute?.trackedEntityAttribute?.id}
                        label={displayLabel}
                        value={value }
                        onChange={onChange}
                        disabled={disabled}
                    />
                ) : (
                    <SelectInput
                        required={attribute?.mandatory}
                        objects={
                            optionSets[
                                attribute?.trackedEntityAttribute?.optionSet?.id
                            ]
                        }
                        name={attribute?.trackedEntityAttribute?.id}
                        label={displayLabel}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )
                ) : valueType === "ORGANISATION_UNIT" ?
                        <TreeViewInput data={orgUnitsLabels}
                        placeholder={displayLabel}
                        onChange={onChange}
                        name={attribute?.trackedEntityAttribute.id}
                        value={valueToFind}
                        disabled={disabled}
                        />
                : (
                <TextInput
                    required={attribute?.mandatory}
                    unique={attribute?.trackedEntityAttribute?.unique}
                    uniqueInvalid={unique === false}
                    validateUnique
                    onValidation={onValidation}
                    name={attribute?.trackedEntityAttribute?.id}
                    label={displayLabel}
                    value={value}
                    onChange={onChange}
                    disabled={
                        disabled ||
                        (attribute?.trackedEntityAttribute?.unique &&
                            (entityId || !!modal))
                    }
                    type={
                        attribute?.trackedEntityAttribute?.valueType === 'NUMBER'
                            ? 'number'
                            : 'text'
                    }
                />
            )}
        </Padding>
    )
}


