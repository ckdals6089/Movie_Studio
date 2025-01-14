import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../config';
import MainImage from '../Commons/MainImage';
import GridCards from '../Commons/GridCards';
import axios from 'axios';
import { Row } from 'antd';
import { useSelector } from "react-redux";
import './landingPage.css';

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    //difine endPoint for access movie DB with API URL and API KEY
    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endPoint)
    }, [])

    //if success to fetch movies, update useState(Movies, MainMovieImage, CurrentPage)
    const fetchMovies = (endPoint) => {
        fetch(endPoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results])
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    //declare LoadMore Moives 
    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endPoint)
    }


    return (
        <div className="landingPageDiv">
            {/* Main Image */}
            {/* If MainMovieIamge is true, display MainImage on lfandingPage*/}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div className="landingPageMoiveList">
                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]} >
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            {/* Button for extending Movie list */}
            <div className="landingPageLoadMore">
                <button onClick={loadMoreItems}> Load More</button>
            </div>
        </div>
    )
}

export default LandingPage