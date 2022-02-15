import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { PlotContext } from './sigplot';

/**
 * Abstract base class for all Layers
 */
class Layer extends Component {
  static propTypes = {
    /** Array of `Number` types */
    data: PropTypes.arrayOf(PropTypes.number), // eslint-disable-line react/no-unused-prop-types

    /** Header options for `data` */
    options: PropTypes.object, // eslint-disable-line react/no-unused-prop-types

    /**
     * Options about the layer
     *
     * @see See [sigplot.layer1d](https://github.com/LGSInnovations/sigplot/blob/master/js/sigplot.layer1d.js)
     * @see See [sigplot.layer2d](https://github.com/LGSInnovations/sigplot/blob/master/js/sigplot.layer2d.js)
     */
    layerOptions: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  };

  static contextType = PlotContext;

  /**
   * On unmount, all we need to do is remove the layer
   * from the plot.
   */
  componentWillUnmount() {
    this.context.remove_layer(this.layer);
  }

  /**
   * The layer components don't _actually_ render to the DOM.
   *
   * They are merely abstractions of canvas-manipulations.
   */
  render() {
    return false;
  }
}

export default Layer;
