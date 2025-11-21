export default interface ItemDto {
  id: string;
  name: string;
  type: string;
  weight?: number | null;
  cost?: number | null;
}
