// import { useContext, useReducer, useRef } from "react";
// import { Data} from "../context/ApiContext";

// interface Review {
//   id: number;
//   author?: string;
//   rating?: number;
//   comment?: string;
//   stars: number;
// }

// interface FormProps {
//   randomNumb: number;
//   apiData: any[];
// }

// const initialReviewState: Review = {
//   id: new Date().getTime(),
//   author: undefined,
//   rating: undefined,
//   comment: undefined,
//   stars: 1,
// };

// type ReviewAction =
//   | { type: 'SET_AUTHOR'; payload: string }
//   | { type: 'SET_COMMENT'; payload: string }
//   | { type: 'SET_STARS'; payload: number }
//   | { type: 'RESET' };

// function reviewReducer(state: Review, action: ReviewAction): Review {
//   switch (action.type) {
//     case 'SET_AUTHOR':
//       return { ...state, author: action.payload };
//     case 'SET_COMMENT':
//       return { ...state, comment: action.payload };
//     case 'SET_STARS':
//       return { ...state, stars: action.payload };
//     case 'RESET':
//       return { ...initialReviewState, id: new Date().getTime() };
//     default:
//       return state;
//   }
// }

// export function ReviewForm({ randomNumb, apiData }: FormProps) {
//   const fetchContext = useContext(Data);
//   const theForm = useRef<any>();
//   const [review, dispatch] = useReducer(reviewReducer, initialReviewState);

//   if (!fetchContext) {
//     return <p>Loading...</p>;
//   }
//   const { switchFetch, setSwitch } = fetchContext;

//   const setReviewFunc = async (idRestaurant: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();

//     if (!review.author || !review.comment || review.stars === 0 || review.stars === undefined) {
//       return;
//     }

//     const url = `http://localhost:5001/restaurants/${idRestaurant}`;
//     const restaurantToUpdate = apiData!.find(restaurant => restaurant.id === idRestaurant);
//     restaurantToUpdate?.reviewsList.push(review);
//     if (restaurantToUpdate) {
//       restaurantToUpdate.reviews += 1;
//     }
//     console.log(restaurantToUpdate);
//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(restaurantToUpdate),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update restaurant');
//       }

//       const updatedData = await response.json();
//       console.log('Restaurant updated:', updatedData);
//     } catch (error) {
//       console.error('Error updating restaurant:', error);
//     }
//     dispatch({ type: 'RESET' });
//     theForm.current.reset();
//     setSwitch(!switchFetch);
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, type: 'SET_AUTHOR' | 'SET_COMMENT') => {
//     dispatch({ type, payload: event.target.value });
//   };

//   const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch({ type: 'SET_STARS', payload: +event.target.value });
//   };

//   return (
//     <form ref={theForm} action="submit">
//       <label>Name</label>
//       <input type="text" onChange={(event) => handleChange(event, 'SET_AUTHOR')} />
//       <label>Comment</label>
//       <textarea name="Comment Area" id="2" onChange={(event) => handleChange(event, 'SET_COMMENT')}></textarea>
//       <label>Stars: {review.stars}</label>
//       <input
//         onChange={handleChangeSlider}
//         type="range"
//         id="star-slider"
//         name="star-slider"
//         min="1"
//         max="5"
//         step="1"
//         defaultValue={1}
//       />
//       <button
//         onClick={(event) => {
//           if (apiData && apiData[randomNumb].id) {
//             setReviewFunc(apiData[randomNumb].id, event);
//           }
//         }}
//       >
//         Leave a review
//       </button>
//     </form>
//   );
// }


import { useContext, useRef } from 'react';
import { Data } from '../context/ApiContext';
import { useReviewStore } from '../useReviewStore';

interface FormProps {
  randomNumb: number;
  apiData: any[];
}

export function ReviewForm({ randomNumb, apiData }: FormProps) {
  const fetchContext = useContext(Data);
  const theForm = useRef<any>();
  const { review, setAuthor, setComment, setStars, resetReview } = useReviewStore();

  if (!fetchContext) {
    return <p>Loading...</p>;
  }
  const { switchFetch, setSwitch } = fetchContext;

  const setReviewFunc = async (idRestaurant: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!review.author || !review.comment || review.stars === 0 || review.stars === undefined) {
      return;
    }

    const url = `http://localhost:5001/restaurants/${idRestaurant}`;
    const restaurantToUpdate = apiData!.find(restaurant => restaurant.id === idRestaurant);
    restaurantToUpdate?.reviewsList.push(review);
    if (restaurantToUpdate) {
      restaurantToUpdate.reviews += 1;
    }
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantToUpdate),
      });

      if (!response.ok) {
        throw new Error('Failed to update restaurant');
      }

      const updatedData = await response.json();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
    resetReview();
    theForm.current.reset();
    setSwitch(!switchFetch);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setValue: (value: string) => void) => {
    setValue(event.target.value);
  };

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(+event.target.value);
  };

  return (
    <form ref={theForm} action="submit">
      <label>Name</label>
      <input type="text" onChange={(event) => handleChange(event, setAuthor)} />
      <label>Comment</label>
      <textarea name="Comment Area" id="2" onChange={(event) => handleChange(event, setComment)}></textarea>
      <label>Stars: {review.stars}</label>
      <input
        onChange={handleChangeSlider}
        type="range"
        id="star-slider"
        name="star-slider"
        min="1"
        max="5"
        step="1"
        defaultValue={1}
      />
      <button
        onClick={(event) => {
          if (apiData && apiData[randomNumb].id) {
            setReviewFunc(apiData[randomNumb].id, event);
          }
        }}
      >
        Leave a review
      </button>
    </form>
  );
}