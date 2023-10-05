import { useMemo } from "react"

export default function Hamburger({ open, onClick }) {
  // const diagnonalOfRect = useMemo(
  // 	() => 90 - Math.atan(36 / 32) * (180 / Math.PI),
  // 	[]
  // )

  const closedStyle = useMemo(() => ({ transform: "none" }), [])
  const firstBarStyle = useMemo(() => ({ transform: `rotate(41deg) scaleX(1.1)` }), [])
  const secondBarStyle = useMemo(() => ({ transform: "scaleX(0)" }), [])
  const thirdBarStyle = useMemo(() => ({ transform: `rotate(-41deg) scaleX(1.1)` }), [])

  return (
    <button className="menu__burger-icon" onClick={onClick}>
      <span style={open ? firstBarStyle : closedStyle}></span>
      <span style={open ? secondBarStyle : closedStyle}></span>
      <span style={open ? thirdBarStyle : closedStyle}></span>
    </button>
  )
}
