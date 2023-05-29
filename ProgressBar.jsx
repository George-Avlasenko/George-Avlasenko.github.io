import React from 'react';
import "./progressBar.css"

class ProgressBar extends React.Component {
  render() {
    return (
      <div className='progressBar'>
        <div className={(this.props.trust === 0 ? 'bar-0' :
          this.props.trust <= 2 ? 'bar-20' :
            this.props.trust <= 4 ? 'bar-40' :
              this.props.trust <= 6 ? 'bar-60' :
                this.props.trust <= 8 ? 'bar-80' :
                  this.props.trust <= 10 ? 'bar-100' :
                    this.props.trust <= 20 ? 'bar-120' : '')}>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
