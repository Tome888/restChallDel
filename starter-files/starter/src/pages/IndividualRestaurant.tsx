import { useContext } from "react";
import { Data, Review } from "../context/ApiContext";
import { useParams } from "react-router-dom";
import { DetailsSection } from "../components/DetailsSection";
import { ReviewForm } from "../components/ReviewForm";

export function IndividualRestaurant(){
    const idOfRestaurant = useParams()
    const context = useContext(Data);
    if (!context) {
        return <p>Loading...</p>;
    }
    const { apiData } = context;
    const clickedRest = apiData && apiData.find((rest) => rest.id === idOfRestaurant.nameOfRest)

    const calculateMedianRating = (reviewsList: Review[]) => {
        let arr:number[] = []
        reviewsList.map(rev => {
            if(rev.stars)
            arr.push(rev.stars)
        })
        const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const theMedian = sum / reviewsList.length
        return theMedian
      };
      return (
        <>
          {clickedRest && (
            
            <div className="individualPageContainer">
              <h2 className="individualPageHeader">{clickedRest.businessname}</h2>
              <DetailsSection image={clickedRest.image} phone={clickedRest.phone} email={clickedRest.email} address={clickedRest.address} />
              <p>{clickedRest.parkinglot ? 'We have a parking lot for you' : 'We don’t have a parking lot'}</p>
              <p>{calculateMedianRating(clickedRest.reviewsList) > 0 ? `Rating - ${calculateMedianRating(clickedRest.reviewsList)}` : ''}</p>
              <p>{clickedRest.reviews > 0 ? `Based on ${clickedRest.reviews} reviews` : ''}</p>
              <h2 className="individualPageHeader">REVIEWS</h2>
              {clickedRest.reviewsList.map((review, index) => (
                <div className="commentWrapper" key={index}>
                  <p>
                    <b>Author:</b> {review.author}</p>
                  <p>
                    <b>Message:</b> {review.comment}</p>
                  <p>
                    <b>Stars:</b> {review.stars}</p>
                </div>
              ))}
              <h2 className="individualPageHeader">REVIEW FORM</h2>
              <ReviewForm apiData={apiData} randomNumb={idOfRestaurant.indx?+idOfRestaurant.indx:0}/>
              </div>
          )}
        </>
      );
}