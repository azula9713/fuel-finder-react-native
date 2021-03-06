import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Appearance,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import LottieView from "lottie-react-native";
import { useRecoilValue } from "recoil";
import { StatusBar } from "expo-status-bar";

import DetailsLocaleEn from "../lang/en/Details.json";
import { selectedStationAtom } from "../atoms/resultsAtom";
import { selectedFuelTypeAtom } from "../atoms/fuelTypeAtom";
import * as FuelAPI from "../services/FuelAPI";
import FuelTypes from "../data/FuelTypes";

const Details = () => {
  const FUEL_OPENING_STOCK = 750;

  const selectedStation = useRecoilValue(selectedStationAtom);
  const selectedFuel = useRecoilValue(selectedFuelTypeAtom);

  const [selectedStationData, setSelectedStationData] = useState(null);

  const { data: stationData, isLoading: stationLoading } = useQuery(
    ["getStationData", selectedStation.shedId, selectedFuel],
    () => FuelAPI.getStationData(selectedStation.shedId, selectedFuel)
  );

  useEffect(() => {
    if (stationData?.data) {
      setSelectedStationData(stationData.data);
    }
  }, [stationData]);

  return (
    <SafeAreaView>
      <StatusBar
        style={Appearance.getColorScheme() === "dark" ? "light" : "dark"}
      />
      <View style={styles.container}>
        {stationLoading && (
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieView
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
              source={require("../assets/loading-pump.json")}
            />
          </View>
        )}
        {selectedStationData && (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
            style={{
              flex: 1,
              minHeight: Dimensions.get("window").height,
              paddingHorizontal: 10,
              paddingBottom: 15,
              backgroundColor:
                Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
            }}
          >
            <View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>
                  {DetailsLocaleEn.basicInfo.title}
                </Text>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.basicInfo.stationCode}:{" "}
                  </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.shedCode}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.basicInfo.stationName}:{" "}
                  </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.shedName}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.basicInfo.address}:{" "}
                  </Text>
                  <Text style={styles.metaDataValue}>
                    {selectedStationData.address}
                  </Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>
                  {DetailsLocaleEn.availableTypes.title}
                </Text>
                <Text
                  style={styles.updateText}
                >{`${DetailsLocaleEn.availableTypes.lastUpdated} ${selectedStationData.lastupdateddate}`}</Text>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Petrol 92 </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.availableTypes.openingStock}:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.p92Availablity &&
                          selectedStationData.p92Capacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.p92Availablity &&
                    selectedStationData.p92Capacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.p92Capacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Petrol 95 </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.availableTypes.openingStock}:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.p95Availablity &&
                          selectedStationData.p95Capacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.p95Availablity &&
                    selectedStationData.p95Capacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.p95Capacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Diesel </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.availableTypes.openingStock}:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.davailablity &&
                          selectedStationData.dcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.davailablity &&
                    selectedStationData.dcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.dcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Super Diesel </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.availableTypes.openingStock}:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.sdAvailablity &&
                          selectedStationData.sdcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.sdAvailablity &&
                    selectedStationData.sdcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.sdcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
                <View style={styles.metaDataContainer}>
                  <View>
                    <Text>Kerosene </Text>
                  </View>
                  <Text style={styles.metaDataTitle}>
                    {DetailsLocaleEn.availableTypes.openingStock}:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.metaDataValue,
                      {
                        color:
                          selectedStationData.kavailablity &&
                          selectedStationData.kcapacity > FUEL_OPENING_STOCK
                            ? "green"
                            : "red",
                      },
                    ]}
                  >
                    {selectedStationData.kavailablity &&
                    selectedStationData.kcapacity > FUEL_OPENING_STOCK
                      ? `${selectedStationData.kcapacity} Litres`
                      : "Not Available"}
                  </Text>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>
                  {DetailsLocaleEn.fuelDispatches.title}
                </Text>
                <Text
                  style={styles.updateText}
                >{` ${DetailsLocaleEn.availableTypes.lastUpdated} ${selectedStationData.lastupdateddate}`}</Text>
                {selectedStationData.dispatchSheduleList.map(
                  (dispatch, index) => (
                    <View style={styles.dispatchContainer} key={index}>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          {DetailsLocaleEn.fuelDispatches.plantName}:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>
                          {dispatch.plantName}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          {DetailsLocaleEn.fuelDispatches.productType}:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>
                          {
                            FuelTypes.find(
                              (fuel) => fuel.id === dispatch.fuelType
                            ).name
                          }
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          {DetailsLocaleEn.fuelDispatches.amount}:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>
                          {`${dispatch.amountDispatch} Litres`}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          {DetailsLocaleEn.fuelDispatches.plantExitTime}:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>
                          {dispatch.dispatchTime}
                        </Text>
                      </View>
                      <View style={styles.metaDataContainer}>
                        <Text style={styles.dispatchTitle}>
                          {DetailsLocaleEn.fuelDispatches.eta}:{" "}
                        </Text>
                        <Text style={styles.dispatchValue}>{dispatch.eta}</Text>
                      </View>
                    </View>
                  )
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: Appearance.getColorScheme() === "dark" ? "#000" : "#fff",
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#203F75",
    padding: 10,
    borderRadius: 10,
    backgroundColor:
      Appearance.getColorScheme() === "dark" ? "#EFF6FF" : "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  updateText: {
    fontSize: 11,
    textAlign: "center",
    color: "#203F75",
  },
  categoryTitle: {
    fontSize: Dimensions.get("window").width < 400 ? 16 : 20,
    textAlign: "center",
    color: "#203F75",
    fontWeight: "bold",
  },
  metaDataContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaDataTitle: {
    color: "#000",
    fontSize: Dimensions.get("window").width < 400 ? 13 : 15,
  },
  metaDataValue: {
    color: "black",
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width < 400 ? 13 : 15,
  },
  dispatchContainer: {
    width: "100%",
    backgroundColor: "#EFF6FF",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  dispatchTitle: {
    fontSize: 12,
  },
  dispatchValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
