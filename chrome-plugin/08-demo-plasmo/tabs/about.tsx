import React, { memo } from "react"

interface Props {}

const About: React.FC<Props> = (props) => {
  const {} = props
  return <div>about page</div>
}

export default memo(About)
