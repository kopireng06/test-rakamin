import "./App.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ChakraUiProvider } from "./providers/ChakraUiProvider";
import { ModalProvider } from "./providers/ModalProvider";
import { ReactRouterProvider } from "./providers/ReactRouterProvider";
import { useRedirect } from "./utils/useRedirect";

function App() {
  useRedirect("/", process.env.PUBLIC_URL);

  return (
    <ReactQueryProvider>
      <ChakraUiProvider>
        <ModalProvider>
          <ReactRouterProvider />
        </ModalProvider>
      </ChakraUiProvider>
    </ReactQueryProvider>
  );
}

export default App;
