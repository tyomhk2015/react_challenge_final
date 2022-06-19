import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      [key: string] : string
    };
    white: {
      [key: string] : string
    };
  }
}