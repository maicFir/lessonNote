import React, { memo } from "react"

interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props
  return (
    <div>
      <h1>devtool page</h1>
    </div>
  )
}

export default memo(Index)
