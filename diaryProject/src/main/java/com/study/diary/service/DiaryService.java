package com.study.diary.service;

import java.util.List;

import com.study.diary.mapper.DiaryVO;

public interface DiaryService {
	public int insertDiary(DiaryVO param);
	public int deleteDiary(DiaryVO param);
	public int updateDiary(DiaryVO param);
	public List<DiaryVO> getDiaryList(DiaryVO vo); 
}
