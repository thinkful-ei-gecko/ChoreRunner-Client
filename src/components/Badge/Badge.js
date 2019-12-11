import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import './Badge.css';
import images from '../../ImgAssets/index';

//THIS MIGHT NOT BE NECESSARY, DEPENDING ON OUR REFACTORING OF ENDPOINTS.
//AT THE VERY LEAST, THE REQUESTED ENDPOINT WILL NEED TO BE CHANGED.

export default class Badge extends Component {
  state = {
    levelInfo: {},
  };

  
  componentDidMount() {
    ApiService.getBadge().then(res => {
      this.setState({ levelInfo: res });
    });
  }

  renderBadge() {
    const { levelInfo } = this.state;
    return (
      <section className="levelInfo">
        <div className="badge">
          <div className="image">
            <img src={images[levelInfo.badge]} alt="Badge png" />
          </div>
        </div>
        <div className="level">
          <div className="level_totalScore">
            <h3>Total Score</h3>
            <p className="total_score">{levelInfo.total_score}</p>
            {/* </div> */}
            {/* {/1* <div className="level_NextLevel"> *1/} */}
            <p>To next level: {levelInfo.nextLevel}</p>
            {/* </div>{' '} */}
          </div>
        </div>
      </section>
    );
  }

  render() {
    if (this.state.levelInfo.badge) {
      return this.renderBadge();
    }
    const { levelInfo } = this.state;
    console.log(this.state);
    return <>{!!levelInfo.badge ? this.renderBadge() : <p> LOADING... </p>}</>;
  }
}
