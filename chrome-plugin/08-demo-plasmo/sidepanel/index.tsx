import React, { memo } from "react"

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props
  return <div>this is sidepanel</div>
}

export default memo(Index)
