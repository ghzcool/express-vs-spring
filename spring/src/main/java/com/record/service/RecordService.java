package com.record.service;

import com.record.persistence.entity.Record;
import com.record.persistence.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordService {
    private final RecordRepository recordRepository;

    @Autowired
    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public Iterable<Record> getRecords() {
        return recordRepository.findFirst10ByOrderByIdDesc();
    }

    public Record createRecord(Record item) {
        recordRepository.saveAndFlush(item);
        return recordRepository.findFirst1ByOrderByIdDesc().getFirst();
    }
}
