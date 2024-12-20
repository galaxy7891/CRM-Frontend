import { createSlice } from '@reduxjs/toolkit';
import { CMSState } from '@/types/CMSTypes';

const initialState: CMSState = {
  publicArticle: null,
  publicArticles: [],
  article: null,
  articles: [],
};

const CMSSlice = createSlice({
  name: 'CMS',
  initialState,
  reducers: {
    setPublicArticle: (state, action) => {
      state.publicArticle = action.payload;
    },
    setPublicArticles: (state, action) => {
      state.publicArticles = action.payload;
    },
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
  },
});

// export the setter funtion
export const { setPublicArticle, setPublicArticles, setArticle, setArticles } =
  CMSSlice.actions;

// export the reducer
export default CMSSlice.reducer;
