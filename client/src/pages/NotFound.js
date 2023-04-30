import React from "react"
import PageHeader from "../components/layout/PageHeader"

function NotFound() {
  return (
    <div>
      <div className="page-content">
        <PageHeader heading="No Page Here" />
        <div className="login-greeting">
          <h3>The URL path you've navigated to doesn't exist</h3>
          <p>Looks like you've wandered far afield. Follow the signs back home.</p>
          <p>Select any of the links in the navbar to get on your chosen path.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
