/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Grid, Checkbox, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import { Controller, Control } from 'react-hook-form';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { IInputControl, IOptionControl } from '../../index';

const StyledTextField = withStyles(() => ({
  root: {
    '& label': {
      direction: 'ltr',
      transform: 'none !important',
      fontSize: '14px',
      marginBottom: '7px',
      position: 'relative',
      top: 0,
      left: '3px',
    },
    '& legend': {
      width: 'auto',
      maxWidth: '0px',
    },
  },
}))(TextField);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface AutoCompleteProps extends IInputControl, IOptionControl {
  multiple: boolean;
  control?: Control;
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  limitTags?: number;
  size?: 'medium' | 'small';
  options: any[];
  renderOption?: (option: any, config: any) => JSX.Element;
  onChange?: (value: any) => void;
  defaultValue: any | any[];
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({
  multiple = true,
  gridClasses = { xs: 12, sm: 6, md: 4, lg: 4 },
  options,
  textProperty = 'text',
  disableClearable = true,
  placeholder,
  label,
  style = {},
  control,
  name,
  id = 'autocomplete-id',
  defaultValue,
  disableCloseOnSelect = false,
  limitTags = 2,
  size = 'small',
  disabled,
  required,
  error,
  helperText,
  rules,
  value,
  outline,
  renderOption,
  onChange,
}) => {
  return (
    <Grid
      item
      xs={gridClasses.xs}
      sm={gridClasses.sm}
      md={gridClasses.md}
      lg={gridClasses.lg}
    >
      <Controller
        name={name as string}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ onChange: onChangeHook }) => {
          return (
            <Autocomplete
              onChange={(event: any, newValue: any) => {
                onChangeHook(newValue);
                typeof onChange === 'function' && onChange(newValue);
              }}
              value={value}
              disableClearable={disableClearable}
              multiple={multiple as true}
              id={id}
              limitTags={limitTags}
              options={options}
              size={size}
              disabled={disabled}
              defaultValue={defaultValue}
              disableCloseOnSelect={disableCloseOnSelect}
              getOptionLabel={(option) => option[textProperty]}
              renderOption={
                renderOption
                  ? renderOption
                  : (option, { selected }) => {
                      return multiple ? (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option[textProperty]}
                        </React.Fragment>
                      ) : (
                        <span>{option[textProperty]}</span>
                      );
                    }
              }
              style={style}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  variant={outline ? 'outlined' : 'standard'}
                  disabled={disabled}
                  label={label}
                  placeholder={placeholder}
                  required={required}
                  error={error}
                  helperText={helperText}
                />
              )}
            />
          );
        }}
      />
    </Grid>
  );
};
