import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    dark: {
      [key: string] : string
    };
    default: {
      [key: string] : string
    };
  }
}