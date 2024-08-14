package com.green.nowon;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.green.nowon.websocket.entity.AnswerEntity;
import com.green.nowon.websocket.entity.AnswerEntityRepository;
import com.green.nowon.websocket.entity.IntentionEntity;
import com.green.nowon.websocket.entity.IntentionEntityRepository;

@SpringBootTest
class SpringBootWebsocketSockjsStompApplicationTests {
	
	@Autowired
	private AnswerEntityRepository answerRepository;
	
	@Autowired
	private IntentionEntityRepository intentionRepository;
	
	//@Test
	void 챗봇인사말세팅() {
		
		answerRepository.save(AnswerEntity.builder()
				.intent("안녕하세요")
				.content("정말로 반갑습니다!")
				.build());
	}
	
	//@Test
	void 인사말_데이터사전등록() {
		
		List<String> keywords = Arrays.asList("하이", "안녕하세요", "안녕", "밥 먹었니", "반가워", "hello");
		AnswerEntity answer = answerRepository.findByIntent("안녕하세요").orElseThrow();
		keywords.forEach(keyword->{
			intentionRepository.save(IntentionEntity.builder()
					.keyword(keyword)
					.answer(answer)
					.build());
		});
		
	}

}
