import { useEffect, useRef } from "react"

import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

const withModalProperties = Modal => props => {
  const { dismissModal, returnFocusElement, className } = props
  const focusContainer = useRef()

  useEffect(() => {
    let returnFocus = returnFocusElement.current
    let focusWrapper = focusContainer.current
    const focusElement = focusWrapper.querySelector(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )
    focusElement.focus()

    function handleTrap(e) {
      if (focusWrapper.contains(e.target)) return
      focusElement.focus()
    }

    document.addEventListener("focusin", handleTrap)
    return () => {
      document.removeEventListener("focusin", handleTrap)
      returnFocus.focus()
    }
  }, [returnFocusElement, focusContainer])

  const handleKeyboardDismiss = e => {
    if (e.key === "Escape") dismissModal()
  }

  const handleLightDismiss = e => {
    if (e.target === e.currentTarget) dismissModal()
  }

  return (
    <div
      className="backdrop"
      ref={focusContainer}
      onKeyDown={handleKeyboardDismiss}
      onClick={handleLightDismiss}
    >
      <div className={`modal-content ${className}`}>
        <Modal {...props} />
        <button className="close-modal" onClick={dismissModal}>
          <CloseRoundedIcon />
        </button>
      </div>
    </div>
  )
}

export default withModalProperties
