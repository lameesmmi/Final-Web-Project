import React from 'react';
import './ReviewComponent.css';
const ReviewComponent=()=>{
    return(
        <div id="review-container">
        <div id="stars">
        {/*star icon component */}
            ⭐⭐⭐⭐⭐
        </div>
        <input type="text" id="review-title" placeholder="Review title" />
        <textarea id="review-body" placeholder="Review body" />
        <div id="review-footer">
        <input type="text" id="reviewer-name" placeholder="Reviewer name" />
           
        {/*<span id="review-date">Date</span>*/}
        </div>
    </div>

    );
};
export default ReviewComponent;
