export interface VehicleListTemplateProps {
  vehicles: any[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onBack: () => void;
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible: (visible: boolean) => void;
  handleConfirmDelete: () => void;
  t: any;
  theme: any;
}
