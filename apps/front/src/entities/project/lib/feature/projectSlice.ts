import { ProjectEnumValue } from '@entities/project';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';

interface initialState {
  value: ProjectEnumValue;
  calendar: boolean;
}

const initialState: initialState = {
  value: ProjectEnumValue.REVIEW,
  calendar: false,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    changeProject: (state, action) => {
      state.value = action.payload;
    },
    changeCalendar: (state, action) => {
      state.calendar = action.payload;
    },
  },
});
export const { changeProject, changeCalendar } = projectSlice.actions;
export const selectedProject = (state: RootState) => state.project.value;
export const selectCalendar = (state: RootState) => state.project.calendar;

