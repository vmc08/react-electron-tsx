declare module 'react-async-script' {
  // https://github.com/dozoisch/react-async-script/issues
  import { ReactNode } from "react";

  interface IOptions {
    callbackName?: string,
    globalName?: string,
    removeOnUnmount?: boolean,
    scriptId?: string,
  }

  export interface IAsyncScriptComponentProps { asyncScriptOnLoad: () => void }
  
  export default function(getScriptUrl: string, options?: IOptions): ReactNode<IAsyncScriptComponentProps>
}
