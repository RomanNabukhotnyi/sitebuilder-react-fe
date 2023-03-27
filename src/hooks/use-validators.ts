import type { ValidatorResult } from "../types/validators/ValidatorResult";

const widthAndHeightKeywords = ['auto', 'max-content', 'min-content'];
const weightKeywords = ['normal', 'bold', 'lighter', 'bolder'];
const fontSizeKeywords = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
  'larger',
  'smaller',
];
const colorKeywords = [
  'black',
  'silver',
  'gray',
  'white',
  'maroon',
  'red',
  'purple',
  'fuchsia',
  'green',
  'lime',
  'olive',
  'yellow',
  'navy',
  'blue',
  'teal',
  'aqua',
  'orange',
];

export const useValidators = () => {
  const required = (value: string): ValidatorResult => {
    const isValid = !!value;
    return {
      name: 'required',
      isValid,
      message: isValid ? 'OK' : 'Value is required',
    };
  };

  const minLength = (num: number) => (value: string): ValidatorResult => {
    const isValid = value.length >= num;
    return {
      name: 'minLength',
      isValid,
      message: isValid ? 'OK' : `Value length can't be less then ${num}. Now it is ${value.length}`,
    };
  }

  const email = (value: string): ValidatorResult => {
    const isValid = !!value.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return {
      name: 'email',
      isValid,
      message: isValid ? 'OK' : `That's not a valid email`,
    };
  }

  const exist = (values: string[]) => (value: string): ValidatorResult => {
    const isValid = !values.includes(value);
    return {
      name: 'exist',
      isValid,
      message: isValid ? 'OK' : `Value already exist`,
    };
  }

  const url = (value: string): ValidatorResult => {
    const isValid = !!value.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/
    );
    return {
      name: 'url',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid url`,
    };
  }

  const cssSize = (value: string): ValidatorResult => {
    const isValid = !!value.match(
      /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/g
    ) ||
    !!value.match(/\d+[.\d+]*px/g) ||
    !!value.match(/\d+[.\d+]*(px|rem|em|ex)/g);
    return {
      name: 'cssSize',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid css size`,
    };
  }

  const cssWidthOrHeight = (value: string): ValidatorResult => {
    const isValid = cssSize(value).isValid || !!widthAndHeightKeywords.find((k) => k === value);
    return {
      name: 'cssWidthOrHeight',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid css width or height`,
    };
  }

  const cssWeight = (value: string): ValidatorResult => {
    const isValid = (Number(value) < 1000 && Number(value) > 1) ||
    !!weightKeywords.find((k) => k === value);
    return {
      name: 'cssWeight',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid css weight`,
    };
  }

  const cssFontSize = (value: string): ValidatorResult => {
    const isValid = cssSize(value).isValid || !!fontSizeKeywords.find((k) => k === value);
    return {
      name: 'cssFontSize',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid css font size`,
    };
  }

  const cssColor = (value: string): ValidatorResult => {
    const isValid = !!value.match(/^#[a-z0-9]{6}$/g) || !!colorKeywords.find((k) => k === value);
    return {
      name: 'cssColor',
      isValid,
      message: isValid ? 'OK' : `That’s not a valid css color`,
    };
  }

  return {
    required,
    minLength,
    email,
    exist,
    url,
    cssWidthOrHeight,
    cssWeight,
    cssFontSize,
    cssColor,
  };
};
