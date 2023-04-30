import React from "react"

import PageHeader from "../components/layout/PageHeader"

function FallBackPage() {
  return (
    <div>
      <div className="page-content">
        <h1>Something went wrong</h1>
        <div className="login-greeting">
          <h3>Sorry about that!</h3>
          <p>
            You're seeing this page because an error occurred. Not to worry! Try some of the following and the
            issue may fix itself:
          </p>
          <ol>
            <li>Refresh the page</li>
            <li>Go back to the previous page</li>
            <li>Try again later</li>
          </ol>
          <p>
            If none of those work, please reach out to me at&nbsp;
            <a
              style={{ color: "inherit", textDecoration: "revert" }}
              href="mailto:contact@artistmattdavis.com"
            >
              contact@artistmattdavis.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FallBackPage
