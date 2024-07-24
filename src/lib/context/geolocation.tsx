'use client'

import _ from 'lodash'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type LocationProps = {
  latitude: number
  longitude: number
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
  timestamp: number | null
}

type LocationContextProps = { currentLocation: LocationProps | null }

const DefaultGeolocationContextValue = { currentLocation: null }

const GeolocationContext = createContext<LocationContextProps>(
  DefaultGeolocationContextValue
)

const MAXIMUM_AGE_MS = 300000
const TIMEOUT_MS = 10000

export const GeolocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentLocation, setCurrentLocation] = useState<LocationProps | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  console.log('currentLocation', currentLocation)

  useEffect(() => {
    console.log(typeof window !== 'undefined' && 'geolocation' in navigator)

    const onSuccess = (position: GeolocationPosition) => {
      setCurrentLocation({
        ..._.pick(position.coords, [
          'latitude',
          'longitude',
          'accuracy',
          'altitude',
          'altitudeAccuracy',
          'heading',
          'speed',
        ]),
        timestamp: position.timestamp,
      })
      setLoading(false)
    }

    const onError = (error: GeolocationPositionError) => {
      console.error({ error })
      setError(error.message)
      setLoading(false)
    }

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: TIMEOUT_MS,
      maximumAge: MAXIMUM_AGE_MS,
    })

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  if (loading) return <>位置情報読込中</>

  return (
    <GeolocationContext.Provider value={{ currentLocation }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
        <div>lat:{currentLocation?.latitude || 0}</div>
        <div>lng:{currentLocation?.longitude || 0}</div>
        <div>acc:{currentLocation?.accuracy || 0}</div>
        <div>alt:{currentLocation?.altitude || 0}</div>
        <div>error:{error}</div>
      </div>
      {children}
    </GeolocationContext.Provider>
  )
}

export const useWatchLocation = () => useContext(GeolocationContext)
