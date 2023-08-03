package com.study.diary.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.diary.mapper.DiaryMapper;
import com.study.diary.mapper.DiaryVO;

@Service
public class DiaryServiceImpl implements DiaryService{
	@Autowired
	private DiaryMapper diaryMapper;
		
	@Override
	public int insertDiary(DiaryVO param) {
		int result = diaryMapper.insertDiary(param);
		List<DiaryVO> list = diaryMapper.getDiaryList(param);
		result = list.get(0).getDiaryId();		
		return result;
	}

	@Override
	public int deleteDiary(DiaryVO param) {
		return diaryMapper.deleteDiary(param);
	}

	@Override
	public int updateDiary(DiaryVO param) {
		return diaryMapper.updateDiary(param);
	}

	@Override
	public List<DiaryVO> getDiaryList(DiaryVO param) {
		return diaryMapper.getDiaryList(param);
	}
	

}
