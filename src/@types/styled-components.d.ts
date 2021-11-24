export type CustomTheme = {
  body: string;

  lines: string;
  primaryText: string;
  labelText: string;
  inputBackground: string;
  inputTextColor: string;
  commentBox: string;
  menuHoverColor: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
