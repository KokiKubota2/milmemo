import { AppBar, AuthProvider } from 'app'
import { Box, Container } from 'components/mui/material'

import { GeolocationProvider } from 'lib/context/geolocation'

export const metadata = {
  title: 'MIL MEMO',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='jp'>
    <body>
      <Box sx={{ mb: 10 }}>
        <AppBar />
      </Box>
      <Container>
        <AuthProvider>
          <GeolocationProvider>{/* {children} */}</GeolocationProvider>
        </AuthProvider>
      </Container>
    </body>
  </html>
)

export default RootLayout
