import {Autowire, AutowireComponent} from '@ppirogov/express-decorators';
import {RecordRepositoryInterface} from '../repository';
import {Record} from '../models/Record';

export interface RecordServiceInterface {
  getRecords: () => Promise<Record[]>;
  createRecord: (record: Record) => Promise<Record>;
}

@AutowireComponent
export class RecordService implements RecordServiceInterface {

  @Autowire('RecordRepository')
  private recordRepository: RecordRepositoryInterface;

  async getRecords(): Promise<Record[]> {
    return this.recordRepository.getRecords();
  }

  async createRecord(record: Record): Promise<Record> {
    return this.recordRepository.insertRecord(record);
  }
}
