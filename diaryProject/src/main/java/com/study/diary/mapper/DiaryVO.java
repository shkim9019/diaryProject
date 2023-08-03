package com.study.diary.mapper;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class DiaryVO {
	private int diaryId;
	private int maxDiaryId;
	private String diaryDate;
	private String diaryDateByMonth;
	private String content;
	private String chkYn;
}
