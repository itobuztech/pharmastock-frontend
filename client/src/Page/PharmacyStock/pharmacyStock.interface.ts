export interface SelectedPharmacyStock {
  pharmacyId: string;
  itemId: string;
  qty?: number;
  pharmacyName?: string;
  itemName?: string;
}
export interface ClearancePharmacyStockInput {
  itemId?: string;
  pharmacyId?: string;
  qty: number;
}


