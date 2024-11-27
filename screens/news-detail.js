import { Box, Text, Image, View, Heading, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const NewsDetail = ({ route }) => {
  const navigation = useNavigation();
  const { image, date, title, content } = route.params.item;

  return (
    <ScrollView>
      <View position="relative">
        <Image w="100%" h={420} source={{ uri: image }} alt={title} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            padding: 8,
          }}
          onPress={() => navigation.goBack()}
        >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Box
          mt={-10}
          mx="5"
          bg="white"
          p={4}
          borderRadius="lg"
          shadow={8}
        >
          <Heading mb={2}>{title}</Heading>
          <Text  color="gray.500" >{date}</Text>
          <Text paddingTop={2} fontSize="md" color="gray.800" textAlign="justify">
            {content}
          </Text>
        </Box>
      </View>
    </ScrollView>
  );
};

export default NewsDetail;