import { StrictMode } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
// import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom";
import { QrCodeModal } from "./components/QrCodeModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "demo",
          url: window.location.href,
        },
        infuraAPIKey: "5920517516ba405d8b898b80f8bc4243",
        modals: {
          install: ({ link }) => {
            let modalContainer: HTMLElement | null;

            return {
              mount: () => {
                if (modalContainer) return;

                modalContainer = document.createElement("div");

                modalContainer.id = "meta-mask-modal-container";

                document.body.appendChild(modalContainer);

                ReactDOM.render(
                  <QrCodeModal
                    onClose={() => {
                      ReactDOM.unmountComponentAtNode(modalContainer);
                      modalContainer.remove();
                    }}
                  />,
                  modalContainer
                );
              },
              unmount: () => {
                if (modalContainer) {
                  ReactDOM.unmountComponentAtNode(modalContainer);

                  modalContainer.remove();
                }
              },
            };
          },
        },
      }}
    >
      <App />
    </MetaMaskProvider>
  </StrictMode>
);
