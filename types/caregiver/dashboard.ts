export interface BlobObjType {
  patient: Blob;
  careGiver: Blob;
}

export interface BlobType {
  [id: string]: BlobObjType;
}

export interface DashboardTableType {
  columns: { label: string; value: string }[];
  rows: any[];
}
