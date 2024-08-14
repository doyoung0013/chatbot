package com.green.nowon.websocket;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMQConfig {
	//바인딩(Binding)
	//exchange(익스체인지)-토픽 <- 큐(Queue) 
	//메시지컨버터
	
	//AMQP 메시지의 직렬화 역직렬화를 통해 JSON 형식으로 처리하기 위해
	//직렬화: 자바 객체를 JSON형식으로 변화하여 메시지 브로커에 보낼 수 있게 함.
	//역직렬화: 메시지 브로커부터 수신한 JSON 형식의 메시지를 자바 객체로 변환
	@Bean
	MessageConverter messageConverter() {
		return new Jackson2JsonMessageConverter();
	}
	
}
