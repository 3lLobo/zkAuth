import { useQRCode } from "next-qrcode"

function makeURI(account: string, secret: string): string {
  const type = "totp"
  const issuer = "zkAuth" //encodeURIComponent(issuer)
  const algorithm = "SHA1"
  const period = "30"
  const digits = "6"

  const uri = `otpauth://${type}/${issuer}:${account}?secret=${secret}&issuer=${issuer}&algorithm=${algorithm}&digits=${digits}&period=${period}`

  return uri
}

interface QRProps {
  account: string
  secret: string
}

const QrCodeAuth = (props: QRProps) => {
  const { Canvas } = useQRCode()
  const URI = makeURI(props.account, props.secret)
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
