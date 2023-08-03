package com.study.diary.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DiaryMapper {
	public int insertDiary(DiaryVO param);
	public int deleteDiary(DiaryVO param);
	public int updateDiary(DiaryVO param);
	public List<DiaryVO> getDiaryList(DiaryVO param);
}
