import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface Movie {
  title: string;
  basket: boolean;
  liked: boolean;
}

interface State {
  Movies: Movie[];
  Basket: string[];
  LikedMovies: string[];
}

type Action =
  | {
      type: "ADD_MOVIE";
      payload: Movie;
    }
  | {
      type: "ADD_BASKET";
      payload: string;
    }
  | {
      type: "LIKED_MOVIES";
      payload: string;
    };

const InitialState: State = {
  Movies: [
    { title: "Dune 2", basket: false, liked: false },
    { title: "Avengers", basket: false, liked: false },
    { title: "Thuppaki", basket: false, liked: false },
  ],
  Basket: [],
  LikedMovies: [],
};

const MovieSlice = createSlice({
  name: "movies",
  initialState: InitialState,
  reducers: {
    addMovies: (state, action: PayloadAction<Movie>) => {
      state.Movies.push(action.payload);
    },
    addbasket: (state, action: PayloadAction<string>) => {
      state.Movies = state.Movies.map((movie) => {
        if (movie.title === action.payload) {
          return { ...movie, basket: !movie.basket };
        }
        return movie;
      });
      if (state.Basket.includes(action.payload)) {
        state.Basket = state.Basket.filter((movie) => movie !== action.payload);
      } else {
        state.Basket.push(action.payload);
      }
    },
    addlikemovies: (state, action: PayloadAction<string>) => {
      if (state.LikedMovies.includes(action.payload)) {
        state.LikedMovies = state.LikedMovies.filter(
          (movie) => movie !== action.payload
        );
      } else {
        state.LikedMovies.push(action.payload);
      }
    },
  },
});

const store = configureStore({ reducer: MovieSlice.reducer });

export const { addMovies, addbasket, addlikemovies } = MovieSlice.actions;
export default store;

// function reducer(state: State = InitialState, action: Action) {
//   switch (action.type) {
//     case "ADD_MOVIE":
//       return {
//         ...state,
//         Movies: [...state.Movies, action.payload],
//       };
//     case "ADD_BASKET":
//       return {
//         ...state,
//         Movies: state.Movies.map((movie) =>
//           movie.title === action.payload
//             ? { ...movie, basket: !movie.basket }
//             : movie
//         ),
//         Basket: state.Basket.includes(action.payload)
//           ? state.Basket.filter((movie) => movie !== action.payload)
//           : [...state.Basket, action.payload],
//       };
//     case "LIKED_MOVIES":
//       return {
//         ...state,
//         Movies: state.Movies.map((movie) =>
//           movie.title === action.payload
//             ? { ...movie, liked: !movie.liked }
//             : movie
//         ),
//         LikedMovies: state.LikedMovies.includes(action.payload)
//           ? state.LikedMovies.filter((movie) => movie !== action.payload)
//           : [...state.LikedMovies, action.payload],
//       };
//     default:
//       return state;
//   }
// }
