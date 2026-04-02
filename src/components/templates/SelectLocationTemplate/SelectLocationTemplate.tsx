import React from 'react';
import { 
  Container, 
  MapWrapper, 
  HeaderWrapper, 
  SearchWrapper, 
  CenterPinWrapper, 
  ActionFABWrapper, 
  SheetWrapper 
} from './SelectLocationTemplate.styles';
import { SelectLocationTemplateProps } from './types.d';

export const SelectLocationTemplate: React.FC<SelectLocationTemplateProps> = ({
  mapBackground,
  header,
  searchBar,
  bottomSheet,
  actionFAB,
  centerPin,
}) => {
  return (
    <Container>
      <MapWrapper>{mapBackground}</MapWrapper>
      
      <HeaderWrapper>{header}</HeaderWrapper>
      
      <SearchWrapper>{searchBar}</SearchWrapper>
      
      <CenterPinWrapper pointerEvents="none">
        {centerPin}
      </CenterPinWrapper>
      
      <ActionFABWrapper>{actionFAB}</ActionFABWrapper>
      
      <SheetWrapper>{bottomSheet}</SheetWrapper>
    </Container>
  );
};
