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

  // return (
  //   <section className="levelInfo">
  //     <div className="badge">
  //       <div className="image">{levelInfo.badge}</div>
  //       {/* <Doughnut options={this.options} data={this.data} /> */}
  //     </div>
  //     <div className="level">
  //       <div className="level_totalScore">
  //         <h3>Total Score</h3>
  //         <span>{levelInfo.total_score}</span>
  //       </div>
  //       <div className="level_NextLevel">
  //         To next level: {levelInfo.nextLevel}
  //       </div>
  //     </div>
  //   </section>

  //NANCY
  findImage = string => {
    console.log(string); //Badge1
    const idx = string.indexOf('.'); //There's no period
    let badge = string.slice(0, idx); // There's no index...
    console.log(badge); //Returns 'Badge'
    return badge + 1; //Added the 1 to make it work. But doesn't this end up just being the string that was passed in?
  };
  renderBadgeArea = () => {
    const { levelInfo } = this.state;
    return (
      <section className="levelInfo">
        {/* <div className="badge"> */}
        <img src={images[levelInfo.badge]} alt="level badge" /> //So... could
        just feed in the value from the DB and call it done?
        {/* </div> */}
        <div className="level">Level: {levelInfo.level_id}</div>
        <div className="totalScore">Total Score: {levelInfo.total_score}</div>
        <div className="NextLevel">To next level: {levelInfo.nextLevel}</div>
      </section>
    );
  };

  render() {
    if (this.state.levelInfo.badge) {
      return this.renderBadgeArea();
    }
    const { levelInfo } = this.state;
    console.log(this.state);
    return (
      <>{!!levelInfo.badge ? this.renderBadgeArea() : <p> LOADING... </p>}</>
    );
  }
}
