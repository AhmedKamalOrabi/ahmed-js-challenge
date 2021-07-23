/* eslint-disable @typescript-eslint/no-explicit-any */
/*   This Generic Button component that will work with
 **  Button
 **  Created by Ahmed Ragab
 */

import React from 'react';
import { Grid, Button as MButton } from '@material-ui/core';
import { GridClasses } from '../../interfaces/IInputControl';
import { Color, Size, Variant } from '../../types';

export interface FormButtonProps {
  name?: string;
  label?: string;
  id?: string;
  gridClasses?: Partial<GridClasses>;
  color?: Color;
  disabled?: boolean;
  startIcon?: Node;
  endIcon?: Node;
  fullWidth?: boolean;
  href?: string;
  size?: Size;
  variant?: Variant;
  children?: React.ReactNode | string;
  content?: 'string' | 'icon';
  type?: 'button' | 'submit';
  onSubmit?: (params?: any) => void;
  onClick?: (params?: any) => void;
}

export const FormButton: React.FC<FormButtonProps> = ({
  name,
  label,
  color = 'primary',
  id = `button-${name}-${label}`,
  gridClasses = { xs: 12, sm: 6, md: 3 },
  children = 'Submit',
  type = 'submit',
  disabled = false,
  onSubmit,
  onClick,
  ...rest
}): JSX.Element => {
  return (
    <Grid
      item
      xs={gridClasses.xs}
      sm={gridClasses.sm}
      md={gridClasses.md}
      lg={gridClasses.lg}
    >
      <MButton
        {...rest}
        id={id}
        disabled={disabled}
        onSubmit={onSubmit}
        onClick={onClick}
        type={type}
        variant="contained"
        fullWidth
        color={color}
      >
        {children}
      </MButton>
    </Grid>
  );
};
