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
import { addMovies , addbasket,addlikemovies } from "@/store";

interface RootState {
  Movies:{
    title:string;
    basket:boolean;
    liked:boolean;
  }[];
  Basket:string[];
  LikedMovies:string[];
}
export default function Home() {
  const [movieTitle, setMovietitle] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector(
    (state: RootState) =>
      state.Movies
  );
  const basket = useSelector((state: RootState) => state.Basket);
  const likedmovies = useSelector(
    (state: RootState) => state.LikedMovies
  );

  const AddMovie = () => {
    const NewMovie = {
      title: movieTitle,
      basket: false,
      liked: false,
    };
    if (movieTitle !== "") {
      dispatch(addMovies(NewMovie));
      setMovietitle("");
    }
  };

  const AddLIKE = (data: string) => {
    dispatch(addlikemovies(data));
  };

  const AddBASKET = (data: string) => {
    dispatch(addbasket(data));
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
