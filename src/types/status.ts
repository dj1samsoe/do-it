export type IStatusPayloadCreate = {
  id?: string | undefined;
  label: string;
  value: string;
};

export type IStatusPayloadUpdate = { id: string } & IStatusPayloadCreate;

export const statusDefaultValueForm = {
  id: "",
  label: "",
  value: "",
};
