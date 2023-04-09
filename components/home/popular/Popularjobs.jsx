import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, isError } = useFetch("search", {
    query: "react Developer",
    num_pages: "1",
    page: "1"
  });

  const [selectedJob, setSelectedJob] = useState("");

  if (isLoading) return null;

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerBtn}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.cardsContainer}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : isError ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={item => item.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs