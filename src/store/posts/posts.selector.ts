import { RootState } from "../../types/store";

const postsSelector = (state: RootState) => state.posts;

export { postsSelector };
