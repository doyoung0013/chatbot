package com.green.nowon.websocket.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerEntityRepository extends JpaRepository<AnswerEntity, Long>{

	Optional<AnswerEntity> findByIntent(String string);

}
