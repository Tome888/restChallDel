import { useContext } from "react";

import {  Data, Review } from "../context/ApiContext";
import { SimpleCard } from "./SimpleCards";
import { Card } from "./Card";
import { FuncMedian } from "../context/MedianContext";

export function AllRest() {
    const context = useContext(Data);
    const medianFunc = useContext(FuncMedian);
  
    if (!context) {
      return <p>Loading...</p>;
    }
    if(!medianFunc){
      return null
  }
  
    const { apiData } = context;

    // ====DeleteAfter
  //   const calculateMedianRating = (reviewsList: Review[]) => {
  //     if (!reviewsList || reviewsList.length === 0) return 0;
  //     const stars = reviewsList.map((review: any) => review.stars).filter((star: number) => star !== undefined);
  //     stars.sort((a: number, b: number) => a - b); 
  //     const mid = Math.floor(stars.length / 2);

  //     if (stars.length % 2 === 0) {
  //         return (stars[mid - 1] + stars[mid]) / 2;
  //     } else {
  //         return stars[mid];
  //     }
  // };
  // ====DeleteAfter
    return (
      <section className="allRestaurantsSection">
        <h2>All Restaurants</h2>
        <div className="cardContainer">
          {apiData ? (
            apiData.map((rest, idx) => (
              // <SimpleCard id={rest.id}
              //   key={rest.id}
              //   image={rest.image} 
              //   businessname={rest.businessname} 
              //   restauranttype={rest.restauranttype} 
              //   index={idx} 
              //   />
              <Card 
                  key={rest.id}
                  id={rest.id}
                  image={rest.image} 
                  businessname={rest.businessname} 
                  restauranttype={rest.restauranttype} 
                  amountReviews={rest.reviews}
                  totalRating={medianFunc.calculateMedianRating(rest.reviewsList)}
                  index={idx}
                  objRestaurant={rest}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    );
  }