package com.record.api.controller;

import com.record.persistence.entity.Record;
import com.record.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecordController {

    @Autowired
    RecordService recordService;

    @GetMapping(value = "/api/records", produces = "application/json")
    public Iterable<Record> recordsGet() {
        return this.recordService.getRecords();
    }

    @PostMapping(value = "/api/records", produces = "application/json")
    public Record recordPost(@RequestBody Record item) {
        return this.recordService.createRecord(item);
    }
}
