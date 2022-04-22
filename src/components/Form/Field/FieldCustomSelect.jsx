import {
  OptionUnstyled,
  optionUnstyledClasses,
  PopperUnstyled,
  SelectUnstyled,
  selectUnstyledClasses,
} from "@mui/base";
import { FormControl, FormHelperText } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import { Field } from "formik";
import React from "react";

const colors = {
  title: "#14142b",
  body: "#4e4b66",
  background: "#FFFFFF",
  border: "#4e4b66",
  background_hover: "#F7F7FC",
  outline: "#DAECFF"
}

const StyledButton = styled("button")(
  ({ theme }) => `
  width: 100%;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  // min-height: calc(1.5em + 22px);
  background: ${colors["background"]};
  border: 1px solid ${colors["border"]};
  border-radius: 8px;
  // margin: 0.5em;
  padding: 12px 16px;
  text-align: left;
  line-height: 1.5;
  color: ${colors["body"]};

  &:hover {
    background: ${colors["background_hover"]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${colors["outline"]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z'/%3E%3C/svg%3E");
    }
  }

  &::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'/%3E%3C/svg%3E");
    float: right;
    height: 24px;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: "Inter", sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  padding: 5px;
  margin: 4px 0;
  min-width: 320px;
  background: ${colors["background"]};
  border: 1px solid ${grey[300]};
  border-radius: 8px;
  color: ${colors["body"]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 12px;
  border-radius: 0.45em;
  cursor: pointer;
  transition: .15s ease;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${blue[100]};
    color: ${colors["title"]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${colors["title"]};
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

function Component({ name, listOption }) {
  return (
    <Field name={name}>
      {({
        meta,
        field: { onChange, value: fieldValue, ...restField },
        form: { setFieldValue },
      }) => (
        <Box>
          <FormControl style={{ width: "100%" }}>
            <CustomSelect
              {...restField}
              value={fieldValue}
              onChange={(value) => setFieldValue(name, value)}
            >
              {listOption?.map((list, idx) => (
                <StyledOption key={idx} value={list.value}>{list.name}</StyledOption>
              ))}
            </CustomSelect>
          </FormControl>
          {meta.touched && meta.error ? (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
          ) : null}
        </Box>
      )}
    </Field>
  );
}

export default Component;
