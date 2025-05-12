// src/styled.d.ts
import 'styled-components';
import type { ThemeType } from './styles/Theme';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}
