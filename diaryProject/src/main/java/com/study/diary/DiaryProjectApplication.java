package com.study.diary;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@SpringBootApplication
public class DiaryProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiaryProjectApplication.class, args);
	}
	
	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		
		Resource[] res = new PathMatchingResourcePatternResolver()
				.getResources("classpath:/mapper/*.xml");
		
		bean.setMapperLocations(res);
		return bean.getObject();
	}

}
