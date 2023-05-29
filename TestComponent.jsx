import React from 'react';
import PropTypes from 'prop-types';


class TestComponent extends React.Component {
  render() {
    return (
        <>
          
        </>
    );
  }
}

export default TestComponent;

TestComponent.propTypes = {
	array: PropTypes.array,
	bool: PropTypes.bool,
	number: PropTypes.number,
	object: PropTypes.object,
	string: PropTypes.string,
	symbol: PropTypes.symbol 
};