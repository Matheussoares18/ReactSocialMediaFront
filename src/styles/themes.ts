// eslint-disable-next-line import/no-unresolved
type CustomTheme = {
  body: string;
  lines: string;
  primaryText: string;
  labelText: string;
  inputBackground: string;
  inputTextColor: string;
  commentBox: string;
  menuHoverColor: string;
};

export const lightTheme: CustomTheme = {
  body: '#ffffff',

  lines: '#e1e2e2',
  primaryText: '#000000',
  labelText: '#7a7a7a',
  inputBackground: 'transparent',
  inputTextColor: '#000000',
  commentBox: '#eaeaea',
  menuHoverColor: '#f7f7f7',
};
export const darkTheme: CustomTheme = {
  body: '#363537',

  lines: '#717171',
  primaryText: '#FAFAFA',
  labelText: '#7a7a7a',
  inputBackground: 'transparent',
  inputTextColor: '#ffffff',
  commentBox: '#414141',
  menuHoverColor: '#545454',
};
