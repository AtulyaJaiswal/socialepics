import React, { Fragment } from 'react';
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrendPosts } from '../../actions/postAction';


const TrendHeader = ({trend}) => {

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const openTrend = async (trend) => {
          dispatch(getTrendPosts(trend));
          navigate("/trendPost");
     }

     return (
          <Fragment>
               <div className='trend_button' onClick={() => openTrend(trend)}>
                    <h4>{trend.name}</h4>
               </div>
          </Fragment>
     )
}

export default TrendHeader