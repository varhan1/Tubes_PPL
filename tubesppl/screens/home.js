import React from "react";
import { Box, Image, Text, Heading, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <ScrollView bg="emerald.900">
      <Box mx="4"my="4" p="4" borderRadius="md" bg="emerald.800" shadow="4" overflow="hidden">
        <Image
          source={{ uri: "" }}
          alt="solatt"
          w="full"
          h="40"
          borderRadius="md"
        />
        <Box mt="3">
          <Text color="gray.300" fontSize="xs">
            Kenjeran
          </Text>
          <Text color="gray.300" fontSize="xs">
            23 Jumadilawal 1446 H
          </Text>
          <Text
            color="white"
            fontSize="xs"
            fontWeight="bold"
            mt="1"
            mb="2"
          >{`1 jam 17 menit to Ashar`}</Text>
          <Heading color="white" size="md" mb="1">
            Ashar
          </Heading>
          <TouchableOpacity>
            <Text color="emerald.300" fontWeight="bold">
              Lihat waktu →
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      
      <Box mx="4" mb="4">
        <Heading color="white" size="sm" mb="2">
          Fitur
        </Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: "Kiblat", icon: "https://via.placeholder.com/50" },
            { label: "Tasbih", icon: "https://via.placeholder.com/50" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={{ marginRight: 16 }}>
              <Box alignItems="center">
                <Image
                  source={{ uri: item.icon }}
                  alt={item.label}
                  w="16"
                  h="16"
                  borderRadius="full"
                />
                <Text color="white" fontSize="xs" mt="2">
                  {item.label}
                </Text>
              </Box>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
    </ScrollView>
  );
};

export default Home;
