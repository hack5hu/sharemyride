import React from 'react';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { 
  MapWrapper, 
  HeaderWrapper, 
  SearchWrapper, 
  CenterPinWrapper, 
  ActionFABWrapper, 
  SheetWrapper 
} from './SelectLocationTemplate.styles';
import { SelectLocationTemplateProps } from './types.d';

export interface SelectLocationTemplateExtendedProps extends SelectLocationTemplateProps {
  title?: string;
  onBack?: () => void;
}

export const SelectLocationTemplate: React.FC<SelectLocationTemplateExtendedProps> = ({
  mapBackground,
  title,
  onBack,
  searchBar,
  bottomSheet,
  actionFAB,
  centerPin,
}) => {
  return (
    <ScreenShell title={title} onBack={onBack}>
      <MapWrapper>{mapBackground}</MapWrapper>
      
      <SearchWrapper>{searchBar}</SearchWrapper>
      
      <CenterPinWrapper pointerEvents="none">
        {centerPin}
      </CenterPinWrapper>
      
      <ActionFABWrapper>{actionFAB}</ActionFABWrapper>
      
      <SheetWrapper>{bottomSheet}</SheetWrapper>
    </ScreenShell>
  );
};
