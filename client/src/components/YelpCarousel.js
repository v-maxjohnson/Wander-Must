import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import Yelp from "../components/Yelp";
import range from 'lodash/range';
 
export default class YelpCarousel extends React.Component {
 
  componentWillMount() {
    this.setState({
      children: Yelp.map,
      activeItemIndex: 0,
    });
 
    setTimeout(() => {
      this.setState({
        children: createChildren(9),
      })
    }, 100);
  }
 
  createChildren = n => range(n).map(i => <div key={i} >{i}</div>);
  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });
 
  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;
 
    return (
    <ItemsCarousel
      numberOfCards={3}
      freeScrolling={true}
      showSlither={true}
      slidesToScroll={1}
      firstAndLastGutter={false}
      gutter={10}

      enablePlaceholder
      minimumPlaceholderTime={2000}
      numberOfPlaceholderItems={6}
      appShellItem={<PlaceholderComponent />}

      rightChevron={<ChevronRight />}
      leftChevron={<ChevronLeft />}
      chevronWidth={20}
      outsideChevron={true}

      springConfig={{"stiffness":120,"damping":14}}

      requestToChangeActive={() => this.setState({ activeItemIndex })}
      activeItemIndex={activeItemIndex}
      activePosition={'left'}
      children={[
        {/* <Yelp key={0} />,
        <Yelp key={1} />,
        <Yelp key={2} />,
        <Yelp key={3} />,
        <Yelp key={4} />,
        <Yelp key={5} />,
        <Yelp key={6} />,
        <Yelp key={7} />,
        <Yelp key={8} />,
        <Yelp key={9} />, */}
      ]}
    />
    );  
  }
} 