import React, { Component } from "react"

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      const { FallbackComponent } = this.props
      return <FallbackComponent />
    }

    return this.props.children
  }
}

export default ErrorBoundary
