import React from 'react';
import { Image, StatusBar } from 'react-native';
import { SelectLocationTemplate } from '@/components/templates/SelectLocationTemplate';
import { GlassSearchBar } from '@/components/molecules/GlassSearchBar';
import { LocationBottomSheet } from '@/components/organisms/LocationBottomSheet';
import { MapPin } from '@/components/atoms/MapPin';
import { MapActionFAB } from '@/components/organisms/MapActionFAB';
import { useSelectLocation } from './useSelectLocation';
import { SelectLocationScreenProps } from './types.d';

export const SelectLocationScreen: React.FC<SelectLocationScreenProps> = ({ navigation }) => {
  const {
    searchText,
    setSearchText,
    isSharingLive,
    setIsSharingLive,
    selectedDuration,
    setSelectedDuration,
    handleLocationSelect,
    handleSetLocation,
  } = useSelectLocation();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SelectLocationTemplate
        mapBackground={
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA13DzWmkqTB3LkJDoMvBluIxUBn01BM9DrEMKaVASVpIU15ucScK5likNi8nVI4ERjSbLRPoDDHs9ZbdxXgRO4LAT0xsPf5zLyegIILUPsbOmp8_tB-siYYzhOlG2XsUn2_McPheTSD3AVsOwBbySGjGjqBsDOh5fgg7P-hhl647UU9Eld232-foDN4BP70u-MeDn8tB3zFrXeReczB6a0ZetLSFfA1Gd5kE5ITF4wi5fNU6lyMT4Yy1BIy4PzqwfqF5BZsLsVSAix' }} 
            style={{ width: '100%', height: '100%', opacity: 0.9 }}
            resizeMode="cover"
          />
        }
        title="Select Location"
        onBack={() => navigation.goBack()}
        searchBar={
          <GlassSearchBar 
            value={searchText}
            onChangeText={setSearchText}
            onLocationPress={() => console.log('Fixed current location')}
          />
        }
        centerPin={<MapPin />}
        actionFAB={
          <MapActionFAB 
            label="Set this location" 
            onPress={() => {
              handleSetLocation();
              navigation.goBack();
            }} 
          />
        }
        bottomSheet={
          <LocationBottomSheet 
            isSharingLive={isSharingLive}
            onToggleSharing={setIsSharingLive}
            selectedDuration={selectedDuration}
            onSelectDuration={setSelectedDuration}
            onLocationSelect={(loc) => {
              handleLocationSelect(loc);
              navigation.goBack();
            }}
          />
        }
      />
    </>
  );
};
