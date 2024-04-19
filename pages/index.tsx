import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  RemoveShoppingCart,
} from "@material-ui/icons";
export default function Home() {
  const [movieTitle, setMovietitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector(
    (state: { Movies: { title: string; basket: boolean; liked: boolean }[] }) =>
      state.Movies
  );
  const basket = useSelector((state: { Basket: string[] }) => state.Basket);
  const likedmovies = useSelector(
    (state: { LikedMovies: string[] }) => state.LikedMovies
  );

  const AddMovie = () => {
    const NewMovie = {
      title: movieTitle,
      basket: false,
      liked: false,
    };
    if (movieTitle !== "") {
      dispatch({ type: "ADD_MOVIE", payload: NewMovie });
      setMovietitle("");
    }
  };

  const AddLIKE = (data: string) => {
    dispatch({ type: "LIKED_MOVIES", payload: data });
  };

  const AddBASKET = (data: string) => {
    dispatch({ type: "ADD_BASKET", payload: data });
  };
  return (
    <div className="container">
      <div>
        <h1>My Movie List</h1>
      </div>
      <div className="add-movie">
        <input
          type="text"
          placeholder="MovieList"
          value={movieTitle}
          onChange={(e) => {
            setMovietitle(e.target.value);
          }}
        />
        <button onClick={AddMovie}>Add Movie</button>
      </div>
      <div>
        <h2>My Movies</h2>
        <ul className="movie-list">
          {movies.map((movie, index) => {
            return (
              <Card key={index} className="movie-card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {movie.title}
                  </Typography>
                  <CardActions>
                    <Button
                      startIcon={
                        movie.basket ? (
                          <RemoveShoppingCart />
                        ) : (
                          <AddShoppingCart />
                        )
                      }
                      onClick={() => {
                        AddBASKET(movie.title);
                      }}
                    >
                      {!movie.basket ? "Add to basket" : "remove from basket"}
                    </Button>
                    <Button
                      startIcon={
                        movie.liked ? <Favorite /> : <FavoriteBorder />
                      }
                      onClick={() => {
                        AddLIKE(movie.title);
                      }}
                    >
                      {!movie.liked ? "LIKE" : "DISLIKE"}
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>My Basket {basket.length}</h2>
        <ul>
          {basket.map((movie, index) => {
            return <li key={index}>{movie}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2>Liked Movies {likedmovies.length}</h2>
        <ul>
          {likedmovies.map((movie, index) => {
            return <li key={index}>{movie}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
