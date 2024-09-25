interface Item {
    itemId: string | null;
    qty: number | null;
}

export interface PharmacyStockFormValues {
    itemArr?: Item[];
    pharmacyId: string | null;
    warehouseId: string | null;
}