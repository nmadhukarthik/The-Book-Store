import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store.js";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
    // <GoogleOAuthProvider clietId="856582538119-kpep1k9vl4kdmse6qntktfgnaddusgbq.apps.googleusercontent.com">
    <BrowserRouter>
        <AuthProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <div className="dark:bg-slate-900 dark:text-white">
                        <App />
                    </div>
                </PersistGate>
            </Provider>
        </AuthProvider>
    </BrowserRouter>
    // </GoogleOAuthProvider>
);
