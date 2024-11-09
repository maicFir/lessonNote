import type { PlasmoMessaging } from "@plasmohq/messaging"

const SECRET = "Maic"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  const { password } = req.body

  if (password !== SECRET) {
    res.send("hi,password is error")
  } else {
    res.send("hi,password is right")
  }
}

export default handler
