/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// for react-html-parser support
declare module 'react-html-parser' {
    import { ReactElement } from 'react';

    export default function ReactHtmlParser(
        html: string,
        options?: {
            decodeEntities?: boolean;
            transform?: (
                node: {
                    type: string;
                    name: string;
                    children: any[];
                    next: any;
                    prev: any;
                    parent: any;
                    data: string;
                },
                index: number
            ) => ReactElement<any> | undefined | null;
            preprocessNodes?: (nodes: any) => any;
        }
    ): ReactElement<any>;
}
