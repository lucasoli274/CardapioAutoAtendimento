package com.walkthru.repository;

import com.walkthru.entity.Curiosidade;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CuriosidadeRepository extends CrudRepository<Curiosidade, Long> {
    List<Curiosidade> findByTipo(String tipo);
}
