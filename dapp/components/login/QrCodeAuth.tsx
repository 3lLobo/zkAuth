import { useQRCode } from 'next-qrcode'

interface QRProps {
  uri: string
}

const QrCodeAuth = (props: QRProps) => {
  const { Canvas } = useQRCode()
  const defaultURI = 'otpauth://totp/zkAuth:zkAuth?secret='

  return (
    <div className="flex justify-center">
      <Canvas
        text={props.uri == '' ? defaultURI : props.uri}
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          level: 'M',
          margin: 3,
          scale: 4,
          width: 300,
          color: {
            dark: '#000000FF',
            light: '#FFFFFFFF',
          },
        }}
      />
    </div>
  )
}

export default QrCodeAuth
