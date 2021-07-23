/*   This Generic input component that will work with
 **  input type text,email, password, number, phone
 **  Has toggle password funcationality
 **  TextArea if you send multiline prop and control with rows
 **  Created by Ahmed Ragab
 */

import React, { ReactNode, useState } from 'react';
import {
  InputAdornment,
  IconButton,
  TextField,
  Grid,
  Direction,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { IInputControl } from '../../interfaces';

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

export interface FormInputProps extends IInputControl {
  multiline?: boolean;
  rows?: number;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  direction?: Direction;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  autoComplete = 'current-password',
  endAdornment,
  togglePassword = false,
  id = `input-${type}-${name}-${label}`,
  shrink,
  onChange,
  readOnly,
  startAdornment,
  fullWidth = true,
  gridClasses = { xs: 12, sm: 6, md: 4, lg: 4 },
  inputRef,
  defaultValue,
  direction = 'ltr',
  outline = false,
  hidden = false,
  ...rest
}): JSX.Element | null => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const eyeIConButton = (
    <InputAdornment position="start">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  if (hidden === true) return null;

  return (
    <Grid
      item
      xs={gridClasses.xs}
      sm={gridClasses.sm}
      md={gridClasses.md}
      lg={gridClasses.lg}
    >
      <StyledTextField
        {...rest}
        id={id}
        style={{ direction }}
        variant={outline ? 'outlined' : 'standard'}
        fullWidth={fullWidth}
        autoComplete={autoComplete}
        onChange={onChange}
        label={label}
        type={showPassword ? 'text' : type}
        name={name as string}
        defaultValue={defaultValue}
        InputProps={{
          readOnly,
          startAdornment,
          endAdornment: togglePassword ? eyeIConButton : endAdornment,
        }}
        InputLabelProps={{
          shrink,
        }}
        inputRef={inputRef}
      />
    </Grid>
  );
};
