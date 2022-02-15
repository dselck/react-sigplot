import React from 'react'; // eslint-disable-line no-unused-vars
import Layer from './layer';

/**
 * ArrayLayer wrapper for sigplot.layer1d and sigplot.layer2d
 *
 * This layer is meant for static 1D and 2D (or 1D with `framesize`)
 * JS arrays/ArrayBuffers. A typical use case looks like
 *
 * For a 1-D spectral or time-series plot:
 *
 *   <SigPlot>
 *     <ArrayLayer data={[1, 2, 3]}/>
 *   </SigPlot>
 *
 * For a 2-D raster/heatmap:
 *
 *   <SigPlot>
 *     <ArrayLayer data={[[1, 2, 3], [2, 3, 4]]}/>
 *   </SigPlot>
 */
class ArrayLayer extends Layer {
  /**
   * Handles ArrayLayer being mounted onto the DOM
   *
   * All we need to do when the component 'mounts',
   * is call `plot.overlay_array` with the relevant
   * data and options. This will return our layer object.
   *
   * A large portion of the time, especially for dynamic
   * systems, this will look like
   * `this.context.overlay_array([], undefined)` upon mount.
   */
  componentDidMount() {
    const { data, options, layerOptions } = this.props;
    this.layer = this.context.overlay_array(data, options, layerOptions);
  }

  /**
   * Handles new properties being passed into <ArrayLayer/>
   *
   * UNSAFE_componentWillReceiveProps() replaced with
   * shouldComponentUpdate() as they have similar calling patterns.
   * We are using this method for a side-effect, and therefore
   * returning True. getDerivedStateFromProps() had an additional
   * call at mount which UNSAFE_componentWillReceiveProps() lacked.
   * Thus the usage of shouldComponentUpdate().
   *
   * This sits in the lifecycle right before `componentWillUpdate`,
   * and most importantly `render`, so this is where we will call
   * the plot's `reload` and `headermod` methods.
   *
   * @param nextProps    the newly received properties
   */
  shouldComponentUpdate(nextProps, _nextState) {
    const {
      data: currentData,
      options: currentOptions,
      layerOptions: currentLayerOptions,
    } = this.props;

    const {
      data: nextData,
      options: nextOptions,
      layerOptions: nextLayerOptions,
    } = nextProps;

    // if the data changes, we'll go ahead
    // and do a full `reload`;
    // otherwise, we only need to headermod
    // with the new options
    if (nextData !== currentData) {
      this.context.reload(this.layer, nextData, nextOptions);
    } else if (nextOptions !== currentOptions) {
      this.context.headermod(this.layer, nextOptions);
    } else if (nextLayerOptions !== currentLayerOptions) {
      this.context.get_layer(this.layer).change_settings(nextLayerOptions);
    }

    return true;
  }
}

export default ArrayLayer;
