import type { PlasmoCSUIProps } from "plasmo"
import React from "react"

const AnchorTypePrinter: React.FC<PlasmoCSUIProps> = ({ anchor }) => {
  return <span>{anchor.type}</span>
}

export default AnchorTypePrinter
