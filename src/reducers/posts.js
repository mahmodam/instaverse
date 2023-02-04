import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../actions/types";

// const initialState = {
//   posts: [],
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
  // const { type, payload } = action;
  // switch (type) {
  //   case FETCH_ALL:
  //     return {
  //       ...state,
  //       posts: payload,
  //     };
  //   case CREATE:
  //     return {
  //       ...state,
  //       posts: [...state.posts, payload],
  //     };
  //   case UPDATE:
  //     return {
  //       ...state,
  //       posts: state.posts.map((post) =>
  //         post._id === payload._id ? payload : post
  //       ),
  //     };
  //   case DELETE:
  //     return {
  //       ...state,
  //       posts: state.posts.filter((post) => post._id !== payload),
  //     };
  //   default:
  //     return state;
  // }
};
