import React from 'react'; // eslint-disable-line no-unused-vars
import Layer from './layer';

/**
 * BlueLayer wrapper for sigplot.layer1d and sigplot.layer2d
 *
 * This layer is meant for Bluefiles
 * ArrayBuffers. A typical use case looks like
 *
 * For a 1-D spectral or time-series plot:
 *
 *   <SigPlot>
 *     <BlueLayer data={hcb}/>
 *   </SigPlot>
 *
 * For a 2-D raster/heatmap:
 *
 *   <SigPlot>
 *     <BlueLayer data={hcb}
 *           layerOptions={{
 *             subsize: 8,
 *             layerType: "2D"
 *         }}
 *       />
 *   </SigPlot>
 */
export default class BlueLayer extends Layer {
  /**
   * Handles BlueLayer being mounted onto the DOM
   *
   * All we need to do when the component 'mounts',
   * is call `plot.overlay_bluefile` with the relevant
   * data and options. This will return our layer object.
   */
  componentDidMount() {
    const { data, layerOptions } = this.props;
    this.layer = this.plot.overlay_bluefile(data, layerOptions);
  }

  /**
   * Handles new properties being passed into <BlueLayer/>
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
      this.plot.reload(this.layer, nextData, nextOptions);
    } else if (nextOptions !== currentOptions) {
      this.plot.headermod(this.layer, nextOptions);
    } else if (nextLayerOptions !== currentLayerOptions) {
      this.plot.get_layer(this.layer).change_settings(nextLayerOptions);
    }

    return true;
  }
}
