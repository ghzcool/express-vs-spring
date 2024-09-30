export class Record {
  id?: number;
  name: string;
  description?: string;
  createdDateTime?: string;
  created_date?: string;

  constructor(values?: Record) {
    this.id = values?.id;
    this.name = values?.name;
    this.description = values?.description;
    this.createdDateTime = values?.created_date ?? values?.createdDateTime;
  }
}
