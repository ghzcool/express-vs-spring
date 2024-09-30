package com.record.persistence.repository;

import com.record.persistence.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {

    List<Record> findFirst10ByOrderByIdDesc();

    List<Record> findFirst1ByOrderByIdDesc();

}
