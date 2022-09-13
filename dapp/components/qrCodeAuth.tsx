import { useQRCode } from "next-qrcode"
var base32 = require("thirty-two")

function makeURI(account: string, secret: string): string {
  const type = "totp"
  const issuer = "zkAuth" //encodeURIComponent(issuer)
  const algorithm = "SHA1"
  const period = "30"
  const digits = "6"
  const secretEncoded = base32.encode(secret).toString().replace(/=/g, "")

  const uri = `otpauth://${type}/${issuer}:${account}?secret=${secretEncoded}&issuer=${issuer}&algorithm=${algorithm}&digits=${digits}&period=${period}`

  return uri
}

const QrCodeAuth = (props: any) => {
  const { Canvas } = useQRCode()
  const URI = makeURI("daniel.eth", "Holita")
  console.log("URI:", URI)

  return (
    <div className="flex justify-center">
      <Canvas
        text={URI}
        options={{
          type: "image/jpeg",
          quality: 0.3,
          level: "M",
          margin: 3,
          scale: 4,
          width: 300,
          color: {
            dark: "#000000FF",
            light: "#FFFFFFFF",
          },
        }}
      />
    </div>
  )
}

export default QrCodeAuth
