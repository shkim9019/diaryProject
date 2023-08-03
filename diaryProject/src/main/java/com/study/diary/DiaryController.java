package com.study.diary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.diary.mapper.DiaryVO;
import com.study.diary.service.DiaryService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@ComponentScan(basePackages = {"com.study.*"})
public class DiaryController {
	
	@Autowired
	private DiaryService diaryService;

	public static void main(String[] args) {
		SpringApplication.run(DiaryController.class, args);
	}
	
	@RequestMapping("diary/getDiaryList")
	public List<DiaryVO> getDiaryList(DiaryVO vo, HttpServletRequest request) {
		return diaryService.getDiaryList(vo); 
	}
	
	@RequestMapping("diary/insertDiary")
	public int insertDiary(DiaryVO vo, HttpServletRequest request) throws Exception {
		return diaryService.insertDiary(vo);
	}

	@RequestMapping("diary/updateDiary")
	public int updateDiary(DiaryVO vo, HttpServletRequest request) {
		return diaryService.updateDiary(vo);
	}
	
	@RequestMapping("diary/deleteDiary")
	public int deleteDiary(DiaryVO vo, HttpServletRequest request) {
		return diaryService.deleteDiary(vo);
	}
}

