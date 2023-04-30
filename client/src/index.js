import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import ErrorBoundary from "./components/layout/ErrorBoundary"
import App from "./App"
import FallBackPage from "./pages/FallBackPage"

ReactDOM.render(
  <ErrorBoundary FallbackComponent={FallBackPage}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
)
