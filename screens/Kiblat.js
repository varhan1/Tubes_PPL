import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack, Spinner, Icon } from "native-base";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";  // Untuk ikon

const Kiblat = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [heading, setHeading] = useState(0);

  const kaabaCoords = { lat: 21.4225, lon: 39.8262 };

  const calculateQibla = (userCoords) => {
    const { lat, lon } = userCoords;
    const deltaLon = kaabaCoords.lon - lon;

    const x =
      Math.cos((kaabaCoords.lat * Math.PI) / 180) * Math.sin((deltaLon * Math.PI) / 180);
    const y =
      Math.cos((lat * Math.PI) / 180) * Math.sin((kaabaCoords.lat * Math.PI) / 180) -
      Math.sin((lat * Math.PI) / 180) *
        Math.cos((kaabaCoords.lat * Math.PI) / 180) *
        Math.cos((deltaLon * Math.PI) / 180);

    let angle = (Math.atan2(x, y) * 180) / Math.PI;
    angle = (angle + 360) % 360; // Ensure it's positive
    return angle;
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const userCoords = {
      lat: currentLocation.coords.latitude,
      lon: currentLocation.coords.longitude,
    };
    setLocation(userCoords);
    const direction = calculateQibla(userCoords);
    setQiblaDirection(direction);
  };

  useEffect(() => {
    getLocation();
    const subscription = Magnetometer.addListener((data) => {
      let { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      setHeading((angle + 360) % 360); // Convert to positive angle
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const calculateCompassAngle = () => {
    if (qiblaDirection !== null) {
      const angleDiff = qiblaDirection - heading;
      return (angleDiff + 360) % 360; // Normalize angle
    }
    return 0;
  };

  return (
    <Box flex={1} bg="emerald.900" alignItems="center" justifyContent="center" p={4}>
      <VStack alignItems="center" space={6}>
        <Text color="white" fontSize="2xl" fontWeight="bold" mb={4}>
          Arah Kiblat
        </Text>
        {errorMsg ? (
          <Text color="red.500">{errorMsg}</Text>
        ) : location && qiblaDirection !== null ? (
          <>
            {/* Kompas dengan latar belakang hitam dan efek shadow */}
            <Box
              w="240px"
              h="240px"
              borderWidth="5"
              borderColor="emerald.400"
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              bg="black"
              shadow="6"  // Menambahkan shadow agar kompas terlihat lebih elegan
              style={{
                transform: [{ rotate: `${calculateCompassAngle()}deg` }],
              }}
            >
              {/* Indikator Arah Kiblat (Tanda merah) */}
              <Box
                w="6"
                h="6"
                bg="red.500"
                borderRadius="full"
                position="absolute"
                top="10px"
              />
              <Text color="white" position="absolute" bottom="10px" fontSize="lg">
                N
              </Text>
              {/* Menambahkan ikon untuk menunjukkan arah kiblat */}
              <Icon
                as={Ionicons}
                name="location-sharp"
                size="lg"
                color="yellow.400"
                position="absolute"
                top="40%"
                opacity={0.8}
              />
            </Box>
            <Text color="white" fontSize="md" mt={4}>
              Arah Kiblat: {qiblaDirection.toFixed(2)}°
            </Text>
          </>
        ) : (
          <Spinner color="emerald.300" />
        )}
        {/* Tombol untuk menyegarkan lokasi */}
        <Button onPress={getLocation} colorScheme="emerald" size="lg" variant="outline">
          <Text color="white">Refresh Lokasi</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default Kiblat;
