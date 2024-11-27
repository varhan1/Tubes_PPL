import React from "react";
import { Box, Image, Text, Heading, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import ikon lokal
import kiblatIcon from "../assets/kiblat.png";
import tasbihIcon from "../assets/tasbih.jpg";

const Home = () => {
  const navigation = useNavigation();

  // Data fitur dengan ikon lokal dan navigasi
  const features = [
    { 
      label: "Kiblat", 
      icon: kiblatIcon, 
      onPress: () => navigation.navigate("Kiblat") 
    },
    { 
      label: "Tasbih", 
      icon: tasbihIcon, 
      onPress: () => navigation.navigate("Tasbih") 
    },
  ];

  return (
    <ScrollView bg="emerald.900">
      {/* Box untuk informasi utama */}
      <Box mx="4" my="4" p="4" borderRadius="md" bg="emerald.800" shadow="4" overflow="hidden">
        <Image
          source={{ uri: "" }} // Jika tidak ada gambar, Anda bisa menggantinya dengan gambar lokal atau URI yang valid
          alt="solatt"
          w="full"
          h="40"
          borderRadius="md"
        />
        <Box mt="3">
          <Text color="gray.300" fontSize="xs">Kenjeran</Text>
          <Text color="gray.300" fontSize="xs">23 Jumadilawal 1446 H</Text>
          <Text color="white" fontSize="xs" fontWeight="bold" mt="1" mb="2">
            {`1 jam 17 menit to Ashar`}
          </Text>
          <Heading color="white" size="md" mb="1">
            Ashar
          </Heading>
          <TouchableOpacity>
            <Text color="emerald.300" fontWeight="bold">Lihat waktu →</Text>
          </TouchableOpacity>
        </Box>
      </Box>
      
      {/* Box untuk fitur */}
      <Box mx="4" mb="4">
        <Heading color="white" size="sm" mb="2">Fitur</Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {features.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={{ marginRight: 16 }} 
              onPress={item.onPress}
            >
              <Box alignItems="center">
                <Image
                  source={item.icon}
                  alt={item.label}
                  w="16"
                  h="16"
                  borderRadius="full"
                />
                <Text color="white" fontSize="xs" mt="2">{item.label}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};

export default Home;
