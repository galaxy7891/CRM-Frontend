import { createSlice } from '@reduxjs/toolkit';
import { CMSState } from '@/types/CMSTypes';

const initialState: CMSState = {
  article: null,
  articles: [],
};

const CMSSlice = createSlice({
  name: 'CMS',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

// export the setter funtion
export const { setArticle, setArticles } = CMSSlice.actions;

// export the reducer
export default CMSSlice.reducer;
