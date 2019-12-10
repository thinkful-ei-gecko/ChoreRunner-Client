import React, { Component } from 'react';
import ApiService from '../../services/api-service';
import './Badge.css';
// import { Doughnut } from 'react-chartjs-2';
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

  render() {
    const { levelInfo } = this.state;
    const nextLevelPoints =
      levelInfo.level_id === 1
        ? levelInfo.level_id * 10
        : (levelInfo.level_id + 1) * 10;

    // this.options = {
    //   responsive: true,
    //   legend: {
    //     display: false,
    //   },
    //   title: {
    //     display: false,
    //     text: 'Chart.js Doughnut Chart',
    //   },
    // };

    // this.data = {
    //   labels: ['Current Score', 'To Next Level'],
    //   datasets: [
    //     {
    //       data: [levelInfo.total_score, nextLevelPoints],
    //       backgroundColor: ['#00A550'],
    //     },
    //   ],
    // };

    return (
      <section className="levelInfo">
        <div className="badge">
          <div className="image">{levelInfo.badge}</div>
          {/* <Doughnut options={this.options} data={this.data} /> */}
        </div>
        <div className="level">
          <div className="level_totalScore">
            <h3>Total Score</h3>
            <span>{levelInfo.total_score}</span>
          </div>
          <div className="level_NextLevel">
            To next level: {levelInfo.nextLevel}
          </div>
        </div>
      </section>
    );
  }
}
